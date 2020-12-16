const {jwtSign,jwtVerify} = require('./handleToken')
const {validatePassword,hashPassword} = require('./handlePassword')
const {validateTextContent,validateSignUp,validateLogin} = require('./handleValidation')
module.exports = {
  jwtSign,jwtVerify,validatePassword,hashPassword,validateSignUp,validateTextContent,validateLogin
}