const connection = require('../config/connection');

const deleteTodo = (user_id, todo_id) => connection.query({
  text: 'DELETE FROM todo WHERE todo_id = $1 and user_id = $2',
  values: [todo_id,user_id],
});

module.exports = deleteTodo;
