#!/usr/bin/env node

const Conf = require('conf');
const helpers = require('./helpers.js');
const cash = require('./cash.js');

const config = new Conf();

const argv = process.argv.slice(2);

// Calls helpers with the list of arguments in case the user passed an optional argument on the command line
helpers(argv);

/**
 * Retrieves arguments from the command line and formats a json configuration variable
 * @type {{amount: int | * | number, from: string | * | number, to: string}}
 */
const command = {
  'amount': argv[0] || 1,
  'from': argv[1] || config.get('defaultFrom', 'USD'),
  'to':
    argv.length > 2
      ? process.argv.slice(4)
      : config.get('defaultTo', ['USD', 'EUR', 'GBP', 'PLN'])
};

// Calls the cash module
cash(command);
