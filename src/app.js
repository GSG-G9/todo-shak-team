const { join } = require("path");

const express = require("express");
const compression = require("compression");
const cookieParser = require("cookie-parser");
require("env2")("./config.env");

const router = require("./router");

const app = express();
app.disable("x-powered-by");
app.use(compression());
app.use(cookieParser());
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(
  express.static(join(__dirname, "..", "public"), { "Cache-Control": false })
);

app.set("port", process.env.PORT || 5555);

app.use(router);

app.use((err, req, res, next) => {
  console.log(err);
  res.status(500).send();
});

module.exports = app;
