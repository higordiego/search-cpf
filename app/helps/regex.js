
module.exports = (object) => object.replace(/[\\n$]/g, '').trim().replace('</td>','').replace('</tr>','').trim()

