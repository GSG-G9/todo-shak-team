const connection = require("../config/connection");

const insertTodo = (user_id, text_content) => {
  return connection.query({
    text: "INSERT INTO todo(user_id,text_content) VALUES ($1,$2)",
    values: [user_id, text_content],
  });
};

module.exports = insertTodo;
