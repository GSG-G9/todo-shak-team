const buildDB = require('./build');

buildDB()
  .then(() => console.log('done'))
  .catch(console.log);
