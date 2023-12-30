let axios = require("axios");
const { GetCurrency_top_100_Currency_Api } = require("../config/serverConfig");

class CurrencyRepo {
  async getcurrency(data) {
    try {
      const response = await axios.get(GetCurrency_top_100_Currency_Api, {
        params: {
          vs_currency: "usd",
          order: "market_cap_desc",
          per_page: 100,
          page: 1,
          sparkline: false,
        },
      });
      const top100Cryptos = response.data;
      return top100Cryptos;
    } catch (error) {
      console.error(error);
      throw error;
    }
  }

  async convertCurrency(sourceCrypto, amount, targetCurrency) {
    try {
      const exchangeRateResponse = await axios.get(Currency_Converted_Api, {
        params: {
          ids: sourceCrypto,
          vs_currencies: targetCurrency,
        },
      });
      const exchangeRate =
        exchangeRateResponse?.data[sourceCrypto][targetCurrency];

      if (!exchangeRate) {
        return res.status(404).json({ error: "Exchange rate not found" });
      }

      const convertedAmount = amount * exchangeRate;

      return {
        sourceCrypto,
        amount,
        targetCurrency,
        convertedAmount,
      };
    } catch (error) {
      console.log(
        "something went wrong in currencyrepo in converting in REPOS",
        error
      );
      throw error;
    }
  }
}

module.exports = CurrencyRepo;
