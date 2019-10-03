const Sequelize = require('sequelize')

let  sequelize = null
let  cpfModel  = require('./../modules/cpf/model')

module.exports = ()=>{
	if(sequelize==null)
	{
		sequelize = new Sequelize('searchCpf', 'root', '1mbitubA', {
		 	host: 'localhost',
		 	dialect: 'mysql',
		});
	}

	return sequelize;
}