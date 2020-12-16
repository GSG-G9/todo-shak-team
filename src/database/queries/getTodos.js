const connection = require('../config/connection');

const getTodos = (id) => connection.query({
  text: 'SELECT text_content , created_at, todo_id FROM todo WHERE user_id = $1 ORDER by created_at desc;',
  values: [id],
});

module.exports = getTodos;


