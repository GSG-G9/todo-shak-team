const connection = require('../config/connection');

const checkEmail = (email) => connection.query({
  text: 'SELECT * FROM users WHERE email = $1',
  values: [email],
});

module.exports = checkEmail;
