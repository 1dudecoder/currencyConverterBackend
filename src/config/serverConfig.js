require("dotenv").config();

module.exports = {
  port: process.env.Port,
  GetCurrency_top_100_Currency_Api1:
    process.env.GetCurrency_top_100_Currency_Api1,
  GetCurrency_top_100_Currency_Api:
    process.env.GetCurrency_top_100_Currency_Api,
  Currency_Converted_Api: process.env.Currency_Converted_Api,
  api_key: process.env.api_key,
};
