const nodemailer = require('nodemailer')
require('dotenv/config')

module.exports.mailNodeSender = (receiver, subject, text) => {
    const transporter = nodemailer.createTransport({ service: 'gmail', auth: { user: process.env.EMAIL_USER, pass: process.env.EMAIL_PASSWORD } })

    const mailOptions = { from: process.env.EMAIL_USER, to: receiver, subject: subject || ' Password Reset', text: text || `Hello ${receiver},\n\n You are receiving this email because you (or someone else) have requested the reset of the password for your account.` }

    transporter.sendMail(mailOptions).then((data) => console.log('Email received successfully by:', data.accepted)).catch((error) => console.log('Email could not send:', error))
}