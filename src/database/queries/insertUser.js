const { text } = require("express");
const connection = require("../config/connection");

const insertUser = (user_name, email, password) => {
  return connection.query({
    text: "INSERT INTO users (user_name, email, password) VALUES ($1,$2,$3)",
    values: [user_name, email, password],
  });
};

module.exports = insertUser;
