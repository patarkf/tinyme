#! /usr/bin/env node
const tinyme = require('./../src/index');
const program = require('commander');

program
  .version('v1.0.0')
  .option('-k, --api-key <api_key>', 'set your API key')
  .option('-m, --minify <path>', 'minify images of a given path')
  .parse(process.argv);

if (program.apiKey) tinyme.setApiKey(program.apiKey);
if (program.minify) tinyme.minifyImages(program.minify);
