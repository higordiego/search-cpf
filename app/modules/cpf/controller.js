module.exports = app => {
	const Cpf = require('./model')
	const Help = require('../../helps/searchCpf')
	function mcpf(v){
		v=v.replace(/\D/g,"")                   
		v=v.replace(/(\d{3})(\d)/,"$1.$2")      
		v=v.replace(/(\d{3})(\d)/,"$1.$2")      

		v=v.replace(/(\d{3})(\d{1,2})$/,"$1-$2")
		return v
	}

	return {
		listOne: (req, res, next)=> {
			
			let birthDate = req.params.date
			let day = birthDate.substring(0,2)
			let month = birthDate.substring(2,4)
			let year = birthDate.substring(4,9)

			birthDate = `${day}/${month}/${year}`
			const query = {

				cpf: mcpf(req.params.cpf),
				birthDate: birthDate
			}

			console.log(query)
			Cpf.findOne(query).then(cpf => {
				if(cpf){
					res.status(200).json(cpf)
				}else{
					Help.searchCpf(query, res)
					
				}
			})
			.catch(err => res.status(500).json({error: 'Search error!'}))


		}
	}
}