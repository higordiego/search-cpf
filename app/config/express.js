const express = require('express')
const http = require('http')
const consign = require('consign')
const bodyParser = require('body-parser')
const config     = require('./urls')

module.exports = ()=>{
	const app = express()
	app.use(bodyParser.json())
	app.use(bodyParser.urlencoded({ extended: false }))
	app.url = config.url

	app.set('port', process.env.PORT || 4200);

	consign()
		.include('app/database')
		.then('app/modules/cpf')
		.into(app)

	return app
}