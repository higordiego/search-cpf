var request = require("request");
const cheerio = require('cheerio')

const Regex = require('./regex')

const Cpf = require('../modules/cpf/model')


function searchCpf(query,res){
	
	const options = { 
		method: 'POST',
		url: 'http://intelligence.directdigital.com.br/open/consultas/execute',
		headers: { 
			'Host': 'intelligence.directdigital.com.br',
			'Accept': '*/*;q=0.5, text/javascript, application/javascript, application/ecmascript, application/x-ecmascript',
			'Accept-Language': 'en-US,en;q=0.5',
			'Content-Type': 'application/x-www-form-urlencoded; charset=UTF-8',
			'X-Requested-With':  'XMLHttpRequest',
			'Referer': 'http://intelligence.directdigital.com.br/open/consultas/situacao_cpf',
			'Connection': 'close' },
			form:  { 
				'receita_federal_pf[cpf]': query.cpf, 
				'receita_federal_pf[data_nascimento]': query.registrationDate,
				class_name: 'ReceitaFederalPf' 
			} 
		}


		request(options, function (error, response, body) {
			if (!error && response.statusCode == 200) {
				var $ = cheerio.load(body); 

				const cpf = $('td').eq(1).text()

				const name =  $('td').eq(3).text();

				const birthDate =  $('td').eq(5).text()

				const regular =  $('td').eq(7).text()

				const registrationDate =  $('td').eq(9).text()
				const registrationDate1990 =  $('td').eq(11).text()
				const verifyingDigit  = $('td').eq(13).text()
				const itsObvious = $('td').eq(15).text()
				const dateOfIssue = $('td').eq(17).text()



				const object = {
					name: Regex(name),
					cpf: Regex(cpf),
					birthDate: Regex(birthDate),
					regular: Regex(regular),
					registrationDate: Regex(registrationDate),
					registrationDate1990: Regex(registrationDate1990),
					verifyingDigit: Regex(verifyingDigit),
					itsObvious: Regex(itsObvious),
					dateOfIssue: Regex(dateOfIssue)

				}

				if(object){
					Cpf.create(object)
					.then(cpf => res.status(200).json(cpf))
					.catch(err => res.status(400).json({error: 'Incorrect data'}))
				}else{

					res.status(400).json({error: 'Incorrect data'})
				}


			}else{
				res.status(500).json({error: body})
			}
		});
	}


	module.exports = {
		searchCpf: searchCpf
	}