const app = require('./app/config/express')()

app.app.database.sequelize.sync().done(()=>{
	app.listen(app.get('port'),()=>{
		console.log(`Server running at http://127.0.0.1:${app.get('port')}${app.url}`)
	})
})
