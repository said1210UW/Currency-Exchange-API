/**
 * Said Sheck
 * 02/22/2022
 * CSE 154 Section AA TA: Max Bi
 * Index.Js allows for users to enter the amount of dollars they want to exchange
 * in terms of a another currency. This will be done by making requests to the
 * currencyExchange API and receiveing data to make these accurate exchanges.
 */
"use strict";

(function() {
  window.addEventListener('load', init);

  /**
   * Allows the Javascript to manipulate Elements from the HTML
   * once the Document Object Model has loaded
   */
  function init() {
    requestCurrencies();

    id("checkbutton").addEventListener('click', function() {
      let inputAmount = id("dollar-input").value;
      if (inputAmount) {
        let foreignCurrency = id("currency-list").value;
        if (qsa(".convert-info > h3").length !== 0) { // check for error sign
          qsa(".convert-info > h3")[0].remove();
        }
        requestExchangeRate(foreignCurrency);
      }
    });
  }

  /**
   * requestCurrencies makes a request to currencyExchange API asking to
   * receive info on all currencies and display the said currency info
   * on the page
   */
  function requestCurrencies() {
    fetch('currencies')
      .then(statusCheck)
      .then(res => res.json())
      .then(res => getcurrInfo(res))
      .catch(res => currencyErrorHandle(res));
  }

  /**
   * requestExchangeRate gets the exchange amount of currency with respect to
   * the dollar and then displays the result on the client side
   * @param {string} currencyCode - a currency code use to designate a specific
   * currency this will be used to get exchange rate info
   */
  function requestExchangeRate(currencyCode) {
    fetch('exchange?currency=' + currencyCode)
      .then(statusCheck)
      .then(res => res.json())
      .then(res => exchangeCalculation(res))
      .then(res => displayExchange(res))
      .catch(res => exchangeErrorHandler(res));
  }

  /**
   * getcurrInfo gets information for our currency bars belows
   * and then calls createCurrencyBar to populate the page
   * with information of said currencies
   * @param {object} currencyJSON - Javascript object containing all info of currenices
   */
  function getcurrInfo(currencyJSON) {
    let keys = Object.keys(currencyJSON);

    let currCode = "";
    let currInfo = {};
    for (let i = 0; i < keys.length; i++) {
      currCode = keys[i];
      currInfo = currencyJSON[currCode];
      createCurrencyBar(currInfo, currCode);
    }
  }

  /**
   * createCurrencyBar creates the currency bar displayed at the bottom of the page
   * showing info about currencies
   * @param {object} currencyInfo - Javascript object containing information
   * of a specific currency
   * @param {string} currencyCode - The currency code of the currency which ties to
   * the JS Object currencyInfo's Key
   */
  function createCurrencyBar(currencyInfo, currencyCode) {
    let bar = document.createElement('article');
    let flag = document.createElement('img');
    let currName = document.createElement('p');
    let currCode = document.createElement('p');

    bar.appendChild(flag);
    bar.appendChild(currName);
    bar.appendChild(currCode);

    flag.src = currencyInfo['picSRC'];
    flag.alt = currencyInfo['currencyName'];

    currName.textContent = currencyInfo['currencyName'];
    currCode.textContent = currencyCode;

    bar.classList.add("currency-bar");
    bar.addEventListener('click', selectedBar);
    id("currencies").appendChild(bar);
  }

  /**
   * selectedBar is a helper function which allows when currency bar is clicked
   * the option will appear selected in the currency info area
   */
  function selectedBar() {
    let currButton = this;
    let buttoncurCode = currButton.lastChild;
    let options = qsa("option");
    for (let i = 0; i < options.length; i++) {
      if (options[i].value === buttoncurCode.textContent) {
        options[i].selected = true;
      } else {
        options[i].selected = false;
      }
    }
  }

  /**
   * currencyErrorHandle lets the user know of any errors when requesting
   * list of currencies
   * @param {string} err - error message to be displayed on the client
   */
  function currencyErrorHandle(err) {
    let message = document.createElement("h3");
    message.textContent = err + " Please Reload";
    id("currencies").appendChild(message);
  }

  /**
   * gets the exchange amount rounded to the nearest cent
   * @param {object} exchangeJSON - information from API giving us exchange rates
   * @returns {array} array containing the accurate exchange amount as well as
   * information regarding exchange rates
   */
  function exchangeCalculation(exchangeJSON) {
    let inputAmount = id("dollar-input").value;
    let exchangeAmount = exchangeJSON['exchangeRate'] * inputAmount;
    let exchangeInfo = [moneyRound(exchangeAmount), exchangeJSON, inputAmount];
    return exchangeInfo;
  }

  /**
   * displayExhange shows the exchange results on to the client
   * @param {array} exchangeInfo - array containing the accurate exchange amount
   * as well as information regarding exchange rate
   */
  function displayExchange(exchangeInfo) {
    let exchangeAmount = exchangeInfo[0];
    let exchangeJSON = exchangeInfo[1];
    let inputAmount = exchangeInfo[2];

    qs("#dollars > p").textContent = "$ " + inputAmount;
    qs("#foreign > h3").textContent = exchangeJSON["Currency"];

    let currencyName = exchangeJSON["Currency"];
    if (currencyName === "Euro") {
      qs("#foreign > p").textContent = "\u20AC " + exchangeAmount;
    } else if (currencyName.includes("Yen")) {
      qs("#foreign > p").textContent = "\u00A5 " + exchangeAmount;
    } else if (currencyName.includes("Pound")) {
      qs("#foreign > p").textContent = "\u00A3 " + exchangeAmount;
    } else if (currencyName.includes("Rupee")) {
      qs("#foreign > p").textContent = "\u20B9 " + exchangeAmount;
    } else if (currencyName.includes("Ruble")) {
      qs("#foreign > p").textContent = "\u20BD " + exchangeAmount;
    } else if (currencyName.includes("Yuan")) {
      qs("#foreign > p").textContent = "\u5143 " + exchangeAmount;
    } else {
      qs("#foreign > p").textContent = "$ " + exchangeAmount;
    }
  }

  /**
   * exchangeErrorHandler displays inforamtion to the client if an Error Occurs from the request
   * @param {string} err - information about what went wrong
   */
  function exchangeErrorHandler(err) {
    let message = document.createElement("h3");
    message.textContent = err + " Please Reload";
    let exchangeDisplay = qsa(".convert-info")[1];

    exchangeDisplay.appendChild(message);
  }

  /**
   * Helper function to round number to accurate hundreths decimal place
   * @param {number} num - input number
   * @returns {number} an accurate to the hundreth decimal
   */
  function moneyRound(num) {
    const hundrethDecimal = 100;
    return Math.ceil(num * hundrethDecimal) / hundrethDecimal;
  }

  /**
   * Helper function to return the response's result text if successful, otherwise
   * returns the rejected Promise result with an error status and corresponding text
   * @param {object} res - response to check for success/error
   * @return {object} - valid response if response was successful, otherwise rejected
   * Promise result
   */
  async function statusCheck(res) {
    if (!res.ok) {
      throw new Error(await res.text());
    }
    return res;
  }

  /**
   * Returns the element that has the ID attribute with the specified value.
   * @param {string} idName - element ID
   * @returns {object} DOM object associated with id.
   */
  function id(idName) {
    return document.getElementById(idName);
  }

  /**
   * Returns the array of elements that match the given CSS selector.
   * @param {string} selector - CSS query selector
   * @returns {object[]} array of DOM objects matching the query.
   */
  function qsa(selector) {
    return document.querySelectorAll(selector);
  }

  /**
   * Returns the first element that matches the given CSS selector.
   * @param {string} selector - CSS query selector.
   * @returns {object} The first DOM object matching the query.
   */
  function qs(selector) {
    return document.querySelector(selector);
  }
})();