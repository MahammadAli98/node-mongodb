const swaggerJsDoc = require("swagger-jsdoc")

const options = { swaggerDefinition: { openapi: "3.0.0", info: { title: 'NodeEx API', version: '0.0.3', description: 'NodeEx API', contact: { name: 'NodeEx' }, servers: [{ url: `http://localhost:${process.env.PORT}` }] } }, apis: ['./docs/*.js'] }

module.exports.swaggerSpecs = swaggerJsDoc(options)