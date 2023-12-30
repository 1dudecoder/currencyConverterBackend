const express = require("express");
const { port } = require("./config/serverConfig");
const bodyParser = require("body-parser");
const router = require("./routes/index");

let myServer = () => {
  let app = express();
  app.use(bodyParser.json());
  app.use(bodyParser.urlencoded({ extended: true }));

  app.use("/api", router);

  app.listen(port, () => {
    console.log(`Server is running on http://localhost:${port}`);
  });
};

myServer();
