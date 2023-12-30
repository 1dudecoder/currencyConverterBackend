let express = require("express");
let router = express.Router();
const currencycontroller = require("../../controller/index");

router.get("/top/100", currencycontroller.getCurrency);
router.post("/convert", currencycontroller.converCurrency);

module.exports = router;
