/**
 * This script uses the got module to load currencies trade rates and internally make the conversion
 */

/*eslint-disable no-process-exit*/
const got = require('got');
const money = require('money');
const chalk = require('chalk');
const ora = require('ora');
const currencies = require('../lib/currencies.json');

const API = 'https://api.fixer.io/latest';

/**
 * Function that will make conversions thanks to the given rates
 * @param configuration JSON containing the amount, starting currencies, destination currencies, conversion rates and
 * a loading message to be printed on the console
 */
const convert = configuration => {
    const {amount, to, from, response, loading} = configuration;

    money.base = response.body.base;
    money.rates = response.body.rates;

    to.forEach(item => {
        if (currencies[item]) {
            loading.succeed(
                `${chalk.green(
                    money.convert(amount, {from, 'to': item}).toFixed(2)
                )} ${`(${item})`} ${currencies[item]}`
            );
        } else {
            loading.warn(`${chalk.yellow(` The ${item} currency not found `)}`);
        }
    });

    console.log();
    console.log(
        chalk.underline.gray(
            ` Conversion of ${chalk.bold(from)} ${chalk.bold(amount)}`
        )
    );
    process.exit(1);
};

/**
 * Retrieves arguments from the command variable passed by index.js and calls the API to get conversion rates
 * @param command A JSON containing the list of parameters cash will use
 * @returns {Promise<void>}
 */
const cash = async command => {
    const amount = command.amount;
    const from = command.from.toUpperCase();
    const to = command.to
        .filter(item => item !== from)
        .map(item => item.toUpperCase());

    console.log();
    const loading = ora({
        'text': 'Converting currency...',
        'color': 'green',
        'spinner': {
            'interval': 200,
            'frames': to
        }
    });

    loading.start();

    try {
        const response = await got(API, {'json': true});

        convert({amount, to, from, response, loading});
    } catch (err) {
        if (err.code === 'ENOTFOUND') {
            loading.fail(chalk.red('   Please check your internet connection.\n'));
        } else {
            loading.fail(chalk.red('   Internal server error... \n'));
        }

        process.exit(1);
    }
};

module.exports = cash;
