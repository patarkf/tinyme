const app = require('./app');
const { logger } = require('./helpers/logger');

/**
 * Gets and prints the total number of minified images based
 * on the previously set API key.
 */
const getCompressionCount = async (apiKey) => {
  try {
    await app.setAndValidateApiKey(apiKey);
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
const minifyImages = async (path, apiKey) => {
  try {
    await app.setAndValidateApiKey(apiKey);
    await app.run(path);
  } catch (err) {
    logger.error(err.message);
  }
};

module.exports = {
  getCompressionCount,
  minifyImages,
};
