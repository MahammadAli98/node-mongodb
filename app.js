const express = require('express')
const app = express()
const cors = require('cors')()
const swaggerUI = require("swagger-ui-express")
const { MongoClient } = require('mongodb')
const { swaggerSpecs } = require('./docs/index.js')
// const pino = require('pino-http')()
require('dotenv/config')
let client, db

const connectToDatabase = async () => { client = new MongoClient(process.env.DB_CONNECT); await client.connect(); db = client.db('nodeex') }

(async () => await connectToDatabase().then(() => { console.log('Connected to MongoDB'); app.listen(process.env.PORT, () => { console.log(`Server Started ${process.env.PORT}`) }) }).catch(err => { console.log(err) }).finally(async () => await console.log("Closing connection to MongoDB")))()

app.use(express.json(), cors)

module.exports.collection = (c) => db.collection(c)

app.use('/api-docs', swaggerUI.serve, swaggerUI.setup(swaggerSpecs))
app.use("/auth", require('./routes/auth.routes'))