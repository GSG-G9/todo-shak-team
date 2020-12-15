const app = require("./app");

app.listen(app.get("port"), () => {
  console.log(
    `Server is running successfully @ http://localhost:${app.get("port")}`
  );
});
