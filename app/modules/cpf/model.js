const mongoose = require('mongoose')
const Schema = mongoose.Schema

const cpf = new Schema({
	name: {type: String, required: true, unique:{index: true}},
	cpf: {type: String, required: true, unique:{index: true}},
	regular: {type: String, required: true},
	birthDate: {type: String, required: true},
	registrationDate: {type: String, required: true},
	registrationDate1990: {type: String, required: true},
	verifyingDigit: {type: String, required: true},
	itsObvious: {type: String, required: true},
	dateOfIssue: {type: String, required: true}
})

module.exports = mongoose.model('Cpf', cpf)