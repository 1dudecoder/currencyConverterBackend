let express = require("express");
let router = express.Router();

let v1apiRouter = require("./v1/index");

router.use("/v1", v1apiRouter);

module.exports = router;
