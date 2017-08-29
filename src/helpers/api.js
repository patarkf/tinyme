/**
 * @name API
 * @description Used as a helper to work with the user TinyPNG API key.
 * @author Patrick Ferreira <paatrickferreira@gmail.com>
 */

const { config } = require('dotenv');
const { writeFileSync } = require('fs');
const globalModulesPath = require('global-modules');

/**
 * Path which the env file will be stored.
 */
const tinymePath = `${globalModulesPath}/tinyme`;

/**
 * Env vars file name.
 */
const tinymeEnvFile = 'variables.env';

/**
 * Env var name.
 */
const tinymeEnvVar = 'TINYME_API_KEY';

/**
 * Returns the previously set API key.
 *
 * @param {string} [envPath=tinymePath]
 * @param {string} [envFile=tinymeEnvFile]
 * @param {string} [envVar=tinymeEnvVar]
 * @returns {string} Returns the API key
 */
const retrieve = (envPath = tinymePath, envFile = tinymeEnvFile, envVar = tinymeEnvVar) => {
  config({ path: `${envPath}/${envFile}` });
  return process.env[envVar];
};

/**
 * Sets and stores an API key as environment variable by creating
 * an .env file which will be read by dotenv afterwards.
 *
 * @param {string} apiKey TinyPNG API key
 * @param {string} [envPath=tinymePath]
 * @param {string} [envFile=tinymeEnvFile]
 * @param {string} [envVar=tinymeEnvVar]
 */
const save = (apiKey, envPath = tinymePath, envFile = tinymeEnvFile, envVar = tinymeEnvVar) => writeFileSync(`${envPath}/${envFile}`, `${envVar}="${apiKey}"`);

module.exports = {
  retrieve,
  save,
};
