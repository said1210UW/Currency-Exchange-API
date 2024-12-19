# CurrencyExchange API, API Documentation
The CurrencyExchange API provides information regarding exhanges rates
of a said currency rate with respect to the United States Dollar. The Data is upto date or at the very least yesterday's data is used

The data used in this project was retrived such as flags https://github.com/transferwise/currency-flags/
and currency info https://openexchangerates.org/api/currencies.json

## Look Up Exchange Rate for a currency

**Request Format:** /exchange

**Request Type:** GET

**Returned Data Format**: JSON

**Description:**  Returns Inforamtion of a validly entered currency such as Offical Name
                  of the enetered currency, exchange rate, and picture of the respected
                  country/union flag tied with the currency*


**Example Request:** /exchange?currency=EUR

**Example Response:**
```json
{
    "Currency" : "Euro",
    "exchangeRate" : 0.882,
    "Flag-Pic" : "Files/flags/eur.png"
}

```
**Error Handling:**
- Possible 500 (Internal Server Error) error:
  - If the server is requested but there is something wrong with the internal files returns
    error with the message: Theres Something Wrong with the Server
- Possible 400 (Invalid Request) error:
  - If the entered currency is not a currency code, returns an error with the message:
    Currency Doesnt Exist Please Re-Enter
  - If there is no entered currency, returns an error with the message: Please Enter a Currency




## Show Currency Info For all Currencies*
**Request Format:** /currencies

**Request Type:** GET

**Returned Data Format**: JSON

**Description:** Returns Information about every currency, this includes the Offical Name
                 and picture of the respected country/union flag tied with the currency

**Example Request:** /currencies

**Example Response:**
```json
{ "AED": {
        "currencyName": "United Arab Emirates Dirham",
        "picSRC": "Files/flags/aed.png"
  },
  "AFN": {
        "currencyName": "Afghan Afghani",
        "picSRC": "Files/flags/afn.png"
  },
  "ALL": {
        "currencyName": "Albanian Lek",
        "picSRC": "Files/flags/all.png"
  },
  "AMD": {
        "currencyName": "Armenian Dram",
        "picSRC": "Files/flags/amd.png"
  },
  "ANG": {
        "currencyName": "Netherlands Antillean Guilder",
        "picSRC": "Files/flags/ang.png"
  }
} 
//more JS Object on More Countries

```
**Error Handling:**
- Possible 500 (Internal Server Error) error:
  - If the server is requested but there is something wrong with the internal files returns
    error with the message: Theres Something Wrong with the Server



## Show Number of Currencies and Exchange Rates
**Request Format:** /info

**Request Type:** GET

**Returned Data Format**: Text

**Description:** Show Number of Currencies and Exchange Rates

**Example Request:** /info

**Example Response:**
Number of Exchange Rates : 161 Number of Currency Rates : 170

**Error Handling:**
- Possible 500 (Internal Server Error) error:
  - If the server is requested but there is something wrong with the internal files returns
    error with the message: Theres Something Wrong with the Server
