const router = require('express').Router()
const argon2 = require('argon2')
const jwt = require('jsonwebtoken')
const { collection } = require('../app')
const joiSchema = require('../validations/joi')
const { mailNodeSender } = require('../utility/nodemailler.utility')
require('dotenv/config')



const genAcsToken = (user) => { return jwt.sign({ sub: user.id }, process.env.ACS_TKN_SCT, { expiresIn: process.env.ACS_TKN_EXP }) }
const genRfsToken = (user) => { return jwt.sign({ sub: user.id }, process.env.RFS_TKN_SCT, { expiresIn: process.env.RFS_TKN_EXP }) }



router.post('/signup', async (req, res) => {
    const { username, email, password } = req.body

    const { error } = joiSchema.signup.validate(req.body)
    if (error) return res.status(400).json({ success: false, error: error.details[0].message })

    const user = await collection('users').findOne({ email })
    if (user) return res.status(400).json({ success: false, error: 'User already exists' })

    try {
        const hash = await argon2.hash(password + process.env.PEPPER, { type: argon2.argon2id, memoryCost: 15360, timeCost: 2 })
        const newUser = await collection('users').insertOne({ username, email, password: hash, refreshToken: [] })
        const accessToken = genAcsToken(newUser)
        const refreshToken = genRfsToken(newUser)
        collection('users').updateOne({ _id: newUser.insertedId }, { $push: { refreshToken: refreshToken } })
        res.status(200).json({ success: true, accessToken, refreshToken })
    } catch (err) { res.status(500).json({ success: false, err: err }) }
})





router.post('/signin', async (req, res) => {
    const { email, password } = req.body
    const { error } = joiSchema.signin.validate(req.body)
    if (error) return res.status(400).json({ success: false, error: error.details[0].message })

    const user = await collection('users').findOne({ email })
    if (!user) return res.status(400).json({ success: false, error: 'User not found' })

    const isMatch = await argon2.verify(user.password, password + process.env.PEPPER)
    if (!isMatch) return res.status(400).json({ success: false, error: 'Invalid password' })

    try {
        const accessToken = genAcsToken(user)
        const refreshToken = genRfsToken(user)
        collection('users').updateOne({ _id: user._id }, { $push: { refreshToken } })
        res.json({ success: true, accessToken, refreshToken })
    } catch (err) { res.status(500).json({ success: false }) }
})





// Forgot password: Step (1)
router.post('/forgot/email', async (req, res) => {
    const { error } = joiSchema.forgotEmail.validate(req.body)
    if (error) return res.status(400).json({ success: false, error: error.details[0].message })

    const user = await collection('users').findOne({ email: req.body.email })
    if (!user) return res.status(400).json({ success: false, error: 'User not found' })

    try {
        const confirmationCode = Math.floor(100000 + Math.random() * 900000).toString()
        collection('users').updateOne({ email: req.body.email }, { $set: { "confirmation.code": confirmationCode } })
        mailNodeSender(req.body.email, 'Confirmation Code', `Your confirmation code is ${confirmationCode}`)
        res.json({ success: true, info: "confirmation code has been sent to your email" })
    } catch (err) { return res.status(401).json({ success: false }) }
})





// Forgot password: Step (3)
router.post('/forgot/password', async (req, res) => {
    const { error } = joiSchema.forgotPass.validate(req.body)
    if (error) return res.status(400).json({ success: false, error: error.details[0].message })

    const user = await collection('users').findOne({ email })
    if (!user) return res.status(400).json({ success: false, error: 'User not found' })

    const validPass = await argon2.verify(user.password, req.body.password + process.env.PEPPER)
    if (validPass) return res.status(400).json({ success: false, error: 'New password should be different from old one' })

    if (user.confirmation.token !== req.body.confirmationToken) return res.status(400).json({ error: 'Confirmation token is incorrect' })

    try {
        const hash = await argon2.hash(req.body.password + process.env.PEPPER, { type: argon2.argon2id, memoryCost: 15360, timeCost: 2 })
        collection('users').findOne({ email: req.body.email }, { $set: { password: hash, confirmation: {} } })
        res.json({ success: true, info: "password has been changed successfully" })
    } catch (err) { return res.status(500).json({ success: false }) }
})



// Forgot password: Step (2)
router.post('/confirmation', async (req, res) => {
    const { error } = joiSchema.confirm.validate(req.body)
    if (error) return res.status(400).json({ success: false, error: error.details[0].message })

    const user = await collection('users').findOne({ email: req.body.email })
    if (!user) return res.status(400).json({ success: false, error: 'User not found' })

    const confCode = req.body.code.replace(/\s/g, '')
    if (user.confirmation.code !== confCode) return res.status(409).json({ success: false, error: 'Code is incorrect' })

    try {
        const confirmationToken = crypto.randomBytes(8).toString('hex')
        collection('users').findOne({ email: req.body.email }, { $set: { confirmation: { token: confirmationToken } } })
        res.json({ success: true, info: "email has been confirmed successfully" })
    } catch (err) { return res.status(500).json({ success: false }) }
})





router.post('/refresh', async (req, res) => {
    const refreshToken = req.body.token
    if (!refreshToken) return res.status(401).json({ success: false, error: 'Refresh token required' })

    try {
        const user = await collection('users').findOne({ refreshToken })
        if (!user) return res.status(400).json({ success: false, error: 'Invalid refresh token' })
        const Jwtpayload = jwt.verify(refreshToken, process.env.RFS_TKN_SCT)
        const accessToken = genAcsToken({ id: Jwtpayload.sub })
        res.json({ success: true, accessToken })
    } catch (err) { return res.status(401).json({ success: false }) }
})





router.delete('/signout', async (req, res) => {
    const refreshToken = req.body.token
    if (!refreshToken) return res.status(401).json({ success: false, error: 'Refresh token required' })

    try {
        const jwtPayload = jwt.verify(refreshToken, process.env.RFS_TKN_SCT)
        const user = await collection('users').findOne(jwtPayload.sub)
        if (!user.refreshToken.includes(refreshToken)) return res.status(400).json({ success: false, error: 'Invalid refresh token' })
        const refreshTokens = user.refreshToken.filter(token => token !== refreshToken)
        collection('users').updateOne({ _id: user._id }, { $set: { refreshToken: refreshTokens } })
        res.json({ success: true })
    } catch (err) { return res.status(401).json({ success: false }) }
})




module.exports = router