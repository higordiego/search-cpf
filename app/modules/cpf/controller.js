module.exports = app => {
	const searchCPF = require('../../helps/searchCpf')	
	const cpfValidator = require('cpf_cnpj').CPF

	return {
		getCPF: (req, res, next)=> {
			
			let birthDate = req.params.date
			let day = birthDate.substring(0,2)
			let month = birthDate.substring(2,4)
			let year = birthDate.substring(4,9)

			birthDate = `${day}/${month}/${year}`

			const query = {
				cpf: cpfValidator.strip(req.params.cpf),
				birthDate: birthDate
			}

			if(cpfValidator.isValid(query.cpf))
				searchCPF.searchCpf(query, res)
			else
				res.status(400).json({message:'CPF not valid'})
		}
	}
}