require('./app/database/mongodb')
const express = require('express')
const http = require('http')
const app = express()
const bodyParser = require('body-parser')


const config = require('./app/config/urls')

app.use(bodyParser.json())
app.use(bodyParser.urlencoded({ extended: false }))


const port = process.env.PORT || 3000
const server = http.createServer(app)

app.url = config.url

require('./app/modules/cpf/routes')(app)

server.listen(port)
console.log(`Server running at http://127.0.0.1:${port}/`)
module.exports = app