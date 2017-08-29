#! /usr/bin/env node
const tinyme = require('./../src/index');
const api = require('./../src/helpers/api')
const program = require('commander');

program
  .version('v1.0.0')
  .option('-k, --api-key <api_key>', 'set your API key')
  .option('-m, --minify <path>', 'minify images from a given directory')
  .option('-c, --count', 'get the number of already minified images so far')
  .parse(process.argv);

if (program.apiKey) api.save(program.apiKey);

const apiKey = api.retrieve();

if (program.minify) tinyme.minifyImages(program.minify, apiKey);
if (program.count) tinyme.getCompressionCount(apiKey);
