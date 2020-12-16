const bcrypt = require("bcrypt");

module.exports.validatePassword = (password,storedPassword)=> bcrypt.compare(password, storedPassword)

module.exports.hashPassword = (password)=> bcrypt.hash(password, 10)