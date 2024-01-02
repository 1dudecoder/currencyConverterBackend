let axios = require("axios");
const {
  GetCurrency_top_100_Currency_Api,
  GetCurrency_top_100_Currency_Api1,
  api_key,
} = require("../config/serverConfig");

class CurrencyRepo {
  async getcurrency(data) {
    console.log(
      "<------i-am-runing----->>>>>>>>>>>>>>>>>>",
      GetCurrency_top_100_Currency_Api1
    );
    try {
      const response = await axios.get(GetCurrency_top_100_Currency_Api1, {
        params: {
          vs_currency: "usd",
          order: "market_cap_desc",
          per_page: 100,
          page: 1,
          sparkline: false,
        },
      });

      const top100Cryptos = response.data;
      console.log(
        response.data,
        "mydata------------------------------------------------------"
      );
      return top100Cryptos;
    } catch (error) {
      console.error(error);
      throw error;
    }
  }

  async getCurrency() {
    console.log("hello---");
    try {
      const parameters = {
        start: "1",
        limit: "100",
        convert: "USD",
      };

      const headers = {
        Accept: "application/json",
        "X-CMC_PRO_API_KEY": api_key,
      };

      const response = await axios.get(GetCurrency_top_100_Currency_Api, {
        headers,
        params: parameters,
      });

      const top100Cryptos = response.data.data;
      return top100Cryptos;
    } catch (error) {
      console.error("Error fetching top 100 currencies:", error.message);
      throw error;
    }
  }

  async getExchangeRate(targetCurrency) {
    console.log("hello2---");
    try {
      const parameters = {
        start: "1",
        limit: "100",
        convert: "USD",
      };

      const headers = {
        Accept: "application/json",
        "X-CMC_PRO_API_KEY": api_key,
      };

      const exchangeRateResponse = await axios.get(
        "https://pro-api.coinmarketcap.com/v1/cryptocurrency/listings/latest",
        {
          headers,
          params: parameters,
        }
      );
      const exchangeRateInfo = exchangeRateResponse.data.data.find(
        (crypto) => crypto.symbol === targetCurrency
      );

      if (!exchangeRateInfo) {
        throw new Error("Exchange rate not found for the target currency");
      }
      // console.log(exchangeRateInfo, "exchangeRateInfo---");
      return exchangeRateInfo.quote.USD.price;
    } catch (error) {
      console.error("Error getting exchange rate:", error.message);
      throw error;
    }
  }

  async convertCurrency(sourceCrypto, amount, targetCurrency) {
    try {
      const top100Cryptos = await this.getCurrency();

      const sourceCryptoInfo = top100Cryptos.find(
        (crypto) => crypto.symbol.trim() === sourceCrypto.trim()
      );

      if (!sourceCryptoInfo) {
        throw new Error("Source cryptocurrency not found in the top 100");
      }

      const sourceCryptoPriceUSD = sourceCryptoInfo.quote.USD.price;
      const targetCurrencyRateUSD = await this.getExchangeRate(targetCurrency);
      console.log(targetCurrencyRateUSD, "targetCurrencyRateUSD-------");
      if (!targetCurrencyRateUSD) {
        throw new Error("Exchange rate not found for the target currency");
      }

      const convertedAmount =
        (amount / sourceCryptoPriceUSD) * targetCurrencyRateUSD;

      return {
        sourceCrypto,
        sourceCryptoPriceUSD,
        targetCurrencyRateUSD,
        amount,
        targetCurrency,
        convertedAmount, // Return the calculated amount without rounding
      };
    } catch (error) {
      console.error("Error converting currency:", error.message);
      throw error;
    }
  }
}

module.exports = CurrencyRepo;
