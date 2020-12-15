const { readFileSync } = require('fs');
const { join } = require('path');
const connection = require('./connection');

const buildDB = () => {
  const sql = readFileSync(join(__dirname, 'build.sql')).toString();
  const fackdata = readFileSync(join(__dirname, 'fackdata.sql')).toString();
  return connection.query(sql).then(() => connection.query(fackdata));
};

module.exports = buildDB;
