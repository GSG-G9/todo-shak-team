const {jwtVerify} = require('../utils')

module.exports.Auth = (req, res, next)=>{
  if(!req.cookies.userToken) return next(new Error ('No token!'))
  return jwtVerify(req.cookies.userToken)
  .then((payload) =>{
    req.userId = payload.userId
    return next()
  })
  .catch((err)=> next(err))
}