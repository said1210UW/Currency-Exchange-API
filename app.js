/**
 * Said Sheck
 * 02/22/2022
 * Section AA TA: Max BI
 * App.JS allows users to get request information regarding foregin exhcnage rates
 * with respect to US Dollars. The following information is accurate as of Feb 22nd
 */

"use strict";
const express = require("express"); // Dependency used to handle HTTP Request
const axios = require("axios");  // To make HTTP requests to the API
const fs = require("fs").promises; // Using FS to Read Files
const app = express();

const EXCHANGE_API_URL = "https://openexchangerates.org/api/latest.json?app_id=3b1817fd9b8e4e6b8f5f0adf0991f1a3";

let isExchangeRateFetched = false;

// Fetch new exchange rates and save as exchangerate.json
async function fetchAndSaveExchangeRates() {
  try {
    const response = await axios.get(EXCHANGE_API_URL);
    const exchangeRates = response.data;

    // Save the exchange rate data to exchangerate.json
    await fs.writeFile("exchangerate.json", JSON.stringify(exchangeRates, null, 2));
    console.log("Exchange rates saved successfully.");
    isExchangeRateFetched = true;
    
  } catch (error) {
    console.error("Error fetching exchange rates:", error.message);
  }
}

// Returns Exchange Rates for various Currenc
app.get("/exchange", async function(req, res) {
  let currency = req.query.currency;
  if (currency) {
    let exchangeRate = await getExchange(currency);
    let currencyName = await getcurrName(currency);
    if (exchangeRate && currencyName) {
      if ((exchangeRate === "fileError" || currencyName === "fileError")) {
        res.status(500).send("Theres Something Wrong with the Server");
      } else {
        let flagSRC = "flags/" + currency.toLowerCase() + ".png";
        res.json({
          'Currency': currencyName,
          'exchangeRate': exchangeRate,
          'Flag-Pic': flagSRC,
          "abbr": currency
        });
      }
    } else {
      res.status(400).send("Currency Doesnt Exist Please Re-Enter");
    }
  } else {
    res.status(400).send("Please Enter a Currency");
  }
});

// Returns the Name of Currencies and the Respective National Flag tied to the Currency
app.get("/currencies", async function(req, res) {
  try {
    let currnameFile = await processCurrFiles();
    currnameFile = JSON.parse(currnameFile);
    let fileKeys = Object.keys(currnameFile);
    let currencyInfo = {};
    let flagSRC = "";
    for (let i = 0; i < fileKeys.length; i++) {
      flagSRC = "flags/" + fileKeys[i].toLowerCase() + ".png";
      currencyInfo[fileKeys[i]] = {"currencyName": currnameFile[fileKeys[i]], "picSRC": flagSRC, "abbrv" :fileKeys[i].toUpperCase()};
    }
    res.json(currencyInfo);
  } catch (err) {
    res.status(500).send("Theres Something Wrong with the Server");
  }
});

// Returns the Number of Currencies and Exchange Rates
app.get("/info", async function(req, res) {
  try {
    let currencyInfo = await countStuff();
    res.type('text');
    res.send(currencyInfo[0] + " " + currencyInfo[1]);
  } catch (err) {
    res.status(500).send("There's Something Wrong with the Server");
  }
});

/**
 * getExchange gets information regarding an exhange rate from a currency
 * with respective to the US Dollar
 * @param {string} exchangeCurr Entered Currency Code
 * @returns {Object} containing inforamtion about the said currency and exchange rate
 * with respect to the US Dollar
 */
async function getExchange(exchangeCurr) {
  try {
    let exchangeFiles = await processExchangeFiles();
    let files = JSON.parse(exchangeFiles);
    let rates = files['rates'];
    return rates[exchangeCurr];
  } catch (err) {
    return "fileError";
  }
}

/**
 * getcurrName retrieves the Offical Name for an entered currency
 * @param {string} exchangeCurr Entered Currency Code
 * @returns {Object} containing Currency Code and Given Offical Currency Name
 */
async function getcurrName(exchangeCurr) {
  try {
    let currnameFile = await processCurrFiles();
    currnameFile = JSON.parse(currnameFile);
    let currencyName = currnameFile[exchangeCurr];
    return currencyName;
  } catch (err) {
    return "fileError";
  }
}

/**
 * The following method proccesses the Currency JSON FILE
 * @returns {string} a string version of the currency JSON file
 */
async function processCurrFiles() {
  let currFiles = await fs.readFile('currencies.json', 'utf8');
  return currFiles;
}

/**
 * The following method processes the exchange rate JSON FILE
 * @returns {string} a string version of the Exchange File
 */
async function processExchangeFiles() {
  let exchangeFiles = await fs.readFile('exchangerate.json', 'utf8');
  return exchangeFiles;
}

/**
 * The following method counts the number of keys in Currency JSON file and
 * exchangeRate file
 * @returns {array} containg strings
 */
async function countStuff() {
  let exchange = await processExchangeFiles();
  let currencies = await processCurrFiles();

  let exchangeJSON = JSON.parse(exchange);
  let exchangeKeys = Object.keys(exchangeJSON['rates']).length;

  let currencyJSON = JSON.parse(currencies);
  let currencyKeys = Object.keys(currencyJSON).length;

  let exchangeRate = ("Number of Exchange Rates : " + exchangeKeys);
  let currencyRate = ("Number of Currency Info : " + currencyKeys);
  return [exchangeRate, currencyRate];
}

app.use(express.static('public'));
const PORT = process.env.PORT || 8000; // To have port changed with class software

// Initialize the server and fetch the exchange rates when the server starts
app.listen(PORT, async () => {
  console.log("Server is running on port 8000");

  // Fetch and save exchange rates when the server starts
  while (isExchangeRateFetched === false) {
    console.log("Fetching exchange rates...");
    await fetchAndSaveExchangeRates();
  }
  
});
