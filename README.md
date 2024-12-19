# CurrencyExchange API Documentation

The CurrencyExchange API provides up-to-date exchange rates for various currencies against the US Dollar. Data is refreshed daily.

The data used in this project is sourced from:
- Flags: [currency-flags](https://github.com/transferwise/currency-flags/)
- Currency Info: [OpenExchangeRates](https://openexchangerates.org/api/currencies.json)

---

## Look Up Exchange Rate for a Currency

**Request Format:** `/exchange`

**Request Type:** GET

**Returned Data Format:** JSON

**Description:** Returns information about a valid currency, including its official name, exchange rate, and the flag of the respective country or union.

**Example Request:** `/exchange?currency=EUR`

**Example Response:**
```json
{
    "Currency": "Euro",
    "exchangeRate": 0.882,
    "Flag-Pic": "Files/flags/eur.png",
    "abbr" : "EUR"
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

## Show Currency Info for All Currencies

**Request Format:** `/currencies`

**Request Type:** GET

**Returned Data Format:** JSON

**Description:** Returns information about all currencies, including their official names and the flag images associated with each currency.

**Example Request:** `/currencies`

**Example Response:**
```json
{
  "AED": {
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
```
**Error Handling:**
- Possible 500 (Internal Server Error) error:
  - If the server is requested but there is something wrong with the internal files returns
    error with the message: Theres Something Wrong with the Server

## Show Number of Currencies and Exchange Rates

**Request Format:** `/info`

**Request Type:** GET

**Returned Data Format:** Text

**Description:** Displays the total number of currencies and exchange rates.

**Example Request:** `/info`

**Example Response:**
Number of Exchange Rates : 161 Number of Currency Rates : 170
  
**Error Handling:**
- **500 (Internal Server Error):** If there’s an issue with the server, an error message will be returned: *"There’s something wrong with the server."*

## How to Run the Server

Follow these steps to run the server:

1. **Clone the Repository (if applicable)**
   - If you haven't already, clone the repository to your local machine using:
     ```bash
     git clone <repository-url>
     ```

2. **Navigate to the Project Directory**
   - Change into the project directory:
     ```bash
     cd <project-directory>
     ```

3. **Install Dependencies**
   - Install the necessary Node.js dependencies using `npm`:
     ```bash
     npm install
     ```
   This will install `express`, `axios`, and other required packages listed in the `package.json` file.

4. **Run the Server**
   - Start the server by running the following command:
     ```bash
     node <server-file.js>
     ```
   - The server will start on port `8000` (or another port if specified in the environment variables).

5. **Verify Exchange Rates Are Fetched**
   - The server will automatically fetch the latest exchange rates when it starts. The data will be saved in `exchangerate.json`.

6. **Access the Server**
   - Once the server is running, you can access it by visiting `http://localhost:8000` in your browser or use an API client like Postman to make requests.
   
7. **Available Endpoints:**
   - `/exchange`: Look up exchange rate for a specific currency.
   - `/currencies`: Retrieve information for all currencies.
   - `/info`: Get the total number of currencies and exchange rates available.

8. **Stop the Server**
   - To stop the server, press `CTRL + C` in the terminal where the server is running.

---

Ensure that you have both `currencies.json` and `exchangerate.json` files in the project directory before running the server. These files will be used for storing and processing currency and exchange rate data.
