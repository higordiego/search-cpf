const   request = require("request");
const   cheerio = require('cheerio')
const   Regex = require('./regex')


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

			let cpf = $('td').eq(1).text()
			let name =  $('td').eq(3).text();
			let birthDate =  $('td').eq(5).text()
			let regular =  $('td').eq(7).text()
			let registrationDate =  $('td').eq(9).text()
			let registrationDate1990 =  $('td').eq(11).text()
			let verifyingDigit  = $('td').eq(13).text()
			let itsObvious = $('td').eq(15).text()
			let dateOfIssue = $('td').eq(17).text()



			let object = {
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
				let status = (object.name.length>0 || object.cpf.length >0 || object.regular.length > 0)?true:false
				res.status(200).json({status:status,person:object})	
			}
		}else{
			res.status(500).json({error: `Error : ${error}`})
		}
	});
}


module.exports = {
	searchCpf: searchCpf
}