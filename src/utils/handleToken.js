const jwt = require("jsonwebtoken");
const {SECRET_KEY} = process.env


module.exports.jwtSign = (msg) =>
  new Promise((resolve, reject) => {
    jwt.sign(msg, SECRET_KEY, { expiresIn: "24h" }, (err, token) => {
      if (err) return reject(err);
      return resolve(token);
    });
  });

  module.exports.jwtVerify = (token) =>
   new Promise((resolve, reject)=>{
    jwt.verify(token,SECRET_KEY, (err, payload)=>{
      if(err) return reject(err);
      return resolve(payload);
    })
  })
