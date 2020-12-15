const { text } = require("express");
const connection = require("../config/connection");

const getUserId = (id) => {
  console.log("kkkkkkk",id);
  return connection.query({
    text: "Select user_name FROM users Where id = $1",
    values: [id],
  });
};

module.exports = getUserId;
