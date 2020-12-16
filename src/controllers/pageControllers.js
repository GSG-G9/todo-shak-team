const {join} = require('path');

module.exports.getHomePage = (req,res)=>{
  res.sendFile(join(__dirname,"..","..","public","home.html"))
}

module.exports.getLoginPage = (req,res)=>{
  res.sendFile(join(__dirname,"..","..","public","html","login.html"))
}

module.exports.getSingUpPage = (req,res)=>{
  res.sendFile(join(__dirname,"..","..","public","html","signup.html"))
}