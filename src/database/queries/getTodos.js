const connection = require('../config/connection');

const getTodos = (id) => connection.query({
  text: 'SELECT text_content , created_at FROM todo WHERE user_id = $1',
  values: [id],
});

module.exports = getTodos;
