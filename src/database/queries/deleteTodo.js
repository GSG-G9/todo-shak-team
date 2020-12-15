const connection = require('../config/connection');

const deleteTodo = (user_id, todo_id) => connection.query({
  text: 'DELETE FROM todo WHERE todo_id = $1 and user_id = $2',
  values: [user_id, todo_id],
});

module.exports = deleteTodo;
