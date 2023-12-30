let { CurrencyService } = require("../services/index");

let currencyservice = new CurrencyService();

const getCurrency = async (req, res) => {
  try {
    let currencies = await currencyservice.getCurrency(req.body);
    return res.status(201).json({
      data: currencies,
      success: true,
      message: "succesfully get a currencies",
      err: {},
    });
  } catch (err) {
    return res.status(500).json({
      data: {},
      success: false,
      message: "not able to created a currencies",
      err: err.message,
    });
  }
};

const converCurrency = async (req, res) => {
  try {
    const { sourceCrypto, amount, targetCurrency } = req.query;

    if (!sourceCrypto || !amount || !targetCurrency) {
      return res.status(400).json({ error: "Invalid parameters" });
    }
    let currencies = await currencyservice.convertCurrency(
      sourceCrypto,
      amount,
      targetCurrency
    );
    return res.status(201).json({
      data: currencies,
      success: true,
      message: "succesfully convered currencies",
      err: {},
    });
  } catch (err) {
    return res.status(500).json({
      data: {},
      success: false,
      message: "not able to convered a currencies",
      err: err.message,
    });
  }
};

module.exports = {
  getCurrency,
  converCurrency,
};
