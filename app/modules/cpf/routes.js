module.exports = app => {
		
	const url = `${app.url}/cpf`	

	const Controller = require('./controller')(app)


	console.log(app.url)
	app.route(`${url}/:cpf/:date`)	
	.get(Controller.listOne)

}	