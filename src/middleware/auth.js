const {jwtVerify} = require('../utils')
const {handleError} = require('../utils')
module.exports.Auth = (req, res, next)=>{
  if(!req.cookies.userToken) return next(handleError({status:401,message:'You are not registered yet'}))
  return jwtVerify(req.cookies.userToken)
  .then((payload) =>{
    req.userId = payload.userId
    return next()
  })
  .catch((err)=> next(handleError({status:403,message:'You are not Authorized...'})))
}