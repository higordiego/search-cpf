module.exports = app => {
		
	const url = `${app.url}/cpf`	
	const Controller = require('./controller')(app)

	app.get(`${url}/:cpf/:date`,Controller.getCPF)

}	