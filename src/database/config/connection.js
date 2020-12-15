const { Pool } = require("pg");
require("env2")("./config.env");

let urlDB = "";
const { NODE_ENV, PRODUCTION_DB_URL, DEV_DB_URL, TEST_DB_URL } = process.env;

switch (NODE_ENV) {
  case "production":
    urlDB = PRODUCTION_DB_URL;
    break;
  case "development":
    urlDB = DEV_DB_URL;
    break;
  case "test":
    urlDB = TEST_DB_URL;
    break;
  default:
    throw new Error("No Database!");
}

const options = {
  connectionString: urlDB,
  SSL: process.env.NODE_ENV === "production",
};

module.exports = new Pool(options);
