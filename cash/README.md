# Cash
> Command line tool to convert your currencies

Cash is a command line tool that gives you the ability to get a conversion between currencies.
As a default behaviour, Cash is going to convert from dollars to euros, polish zloty and australian dollar.

![Cash interface](https://image.noelshack.com/fichiers/2018/10/7/1520798782-mintty-2018-03-11-21-03-25.png)

# How it works

Cash makes http requests to an API that actually gives the currencies trade rates and then converts the given amount. 
You can configure the default currencies
by issuing the following command: `$ cash --save startCurrency [endCurrencies]`.

After creating the configuration file, you then just have to launch cash without specifying any currency.

### List of supported currencies
Here are the currencies supported by cash:

   * AUD - Australian Dollar,
   * RUB - Russian Rouble,
   * EUR - Euro,
   * BGN - Bulgarian Lev,
   * BRL - Real Brazilian,
   * CAD - Canadian Dollar,
   * CHF - Swiss Franc,
   * CNY - Chinese Yuan,
   * CZK - Czech Koruna,
   * DKK - Danish Krone,
   * GBP - Pound Sterling,
   * HKD - Hong Kong Dollar,
   * HRK - Croatian Kuna,
   * HUF - Hungarian Forint,
   * IDR - Indonesian Rupiah,
   * ILS - Israeli Shekel,
   * INR - Indian Rupee,
   * JPY - Japanes Yen,
   * KRW - South Korean Won,
   * MXN - Mexican Peso,
   * MYR - Malaysian Ringgit,
   * NOK - Norwegian Krone,
   * PHP - Philippine Peso,
   * PLN - Polish Zloty,
   * RON - Romanian New Leu,
   * SEK - Swedish Krona,
   * SGD - Singapore Dollar,
   * THB - Thai Baht,
   * TRY - Turkish Lira,
   * USD - US Dollar,
   * ZAR - South African Rand,
   * NZD - New Zealand Dollar

# Usage

In order to convert an amount from a currency to another one use the following syntax:

`$ cash amount startingCurrency [toCurrencies]`

If you want to convert an amount using default currencies, then simply use:

`$ cash amount`

# Config file

If you want to manually edit your configuration file, here is its syntax:

```
{
	"defaultFrom": "usd",
	"defaultTo": [
		"eur",
		"pln",
		"aud"
	]
}
```

You can manually add currencies from the list