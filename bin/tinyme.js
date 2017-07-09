#! /usr/bin/env node
const tinyme = require('./../src/index');
const program = require('commander');
const { config } = require('dotenv');
const { writeFileSync } = require('fs');

config({ path: 'variables.env' });

program
  .arguments('<path> [token]')
  .usage('<path> [token]')
  .action((path, token) => {
    if (typeof token !== 'undefined') {
      writeFileSync('variables.env', `TINYME_API_KEY="${token}"`);
    }

    const apiKey = token || process.env.TINYME_API_KEY || undefined;

    tinyme(path, apiKey);
  })
  .parse(process.argv);
