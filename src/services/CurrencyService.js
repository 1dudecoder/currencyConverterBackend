let { CurrencyRepo } = require("../repository/index");

let currencyrepo = new CurrencyRepo();

class CurrencyService {
  async getCurrency(params) {
    try {
      let data = await currencyrepo.getcurrency(params);
      return data;
    } catch (err) {
      console.log("something went wrong in currency geting service");
      throw err;
    }
  }

  async convertCurrency(sourceCrypto, amount, targetCurrency) {
    try {
      let data = await currencyrepo.convertCurrency(
        sourceCrypto,
        amount,
        targetCurrency
      );
      return data;
    } catch (err) {
      console.log("something went wrong in currencyConverting service", err);
      throw err;
    }
  }
}

module.exports = CurrencyService;
