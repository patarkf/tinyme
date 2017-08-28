const app = require('./app');
const { logger } = require('./helpers/logger');
const { config } = require('dotenv');
const { writeFileSync } = require('fs');
const globalModulesPath = require('global-modules');

/**
 * Returns the previously set API key.
 *
 * @returns {string} Returns the API key
 */
const getApiKey = () => {
  config({ path: `${globalModulesPath}/tinyme/variables.env` });

  const apiKey = process.env.TINYME_API_KEY;
  if (typeof apiKey === 'undefined' || !apiKey.length) {
    throw new Error('Please provide your API key');
  }

  return apiKey;
};

/**
 * Gets and prints the total number of minified images based
 * on the previously set API key.
 */
const getCompressionCount = async () => {
  try {
    await app.setAndValidateApiKey(getApiKey());
    const numberOfMinifiedImages = await app.getCompressionCount();

    logger.info(`You have already minified ${numberOfMinifiedImages} image(s)`);
  } catch (err) {
    logger.error(err.message);
  }
};

/**
 * Starts the minification process of the application.
 *
 * @param {string} path Directory provided by the user
 */
const minifyImages = async (path) => {
  try {
    if (typeof path === 'undefined') {
      throw new Error('Please define a path');
    }

    await app.setAndValidateApiKey(getApiKey());
    await app.run(path);
  } catch (err) {
    logger.error(err.message);
  }
};

/**
 * Sets and stores an API key as environment variable.
 *
 * @param {string} cliApiKey TinyPNG API key
 */
const setApiKey = (cliApiKey) => {
  try {
    if (typeof cliApiKey === 'undefined') {
      throw new Error('Please provide your API key');
    }

    writeFileSync(`${globalModulesPath}/tinyme/variables.env`, `TINYME_API_KEY="${cliApiKey}"`);
  } catch (err) {
    logger.error(err.message);
  }
};

module.exports = {
  getCompressionCount,
  getApiKey,
  minifyImages,
  setApiKey,
};
