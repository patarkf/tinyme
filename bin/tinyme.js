#! /usr/bin/env node
const tinyme = require('./../src/index');
const program = require('commander');
const globalModulesPath = require('global-modules');
const { config } = require('dotenv');
const { writeFileSync } = require('fs');

config({ path: `${globalModulesPath}/tinyme/variables.env` });

program
  .arguments('<path> [api_key]')
  .usage('<path> [api_key]')
  .action((path, cliApiKey) => {
    if (typeof cliApiKey !== 'undefined') {
      writeFileSync(`${globalModulesPath}/tinyme/variables.env`, `TINYME_API_KEY="${cliApiKey}"`);
    }

    const apiKey = cliApiKey || process.env.TINYME_API_KEY || undefined;

    tinyme(path, apiKey);
  })
  .parse(process.argv);
