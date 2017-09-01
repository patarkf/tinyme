/**
 * @name Application
 * @description Minify all images of a given dir by using the TinyPNG API.
 * @see {@link https://github.com/tinify/tinify-nodejs} for TinyPNG client information.
 * @author Patrick Ferreira <paatrickferreira@gmail.com>
 */

const { logger } = require('./helpers/logger');
const fileSystem = require('./helpers/file');
const { green, yellow } = require('colors');
const tinify = require('tinify');

/**
 * Gets the number of already minified images of based on the set API key.
 *
 * @returns {string} Total of compressed images.
 */
const getCompressionCount = async () => tinify.compressionCount;

/**
 * Minifies a given image, logging the result afterwrads.
 *
 * @param {string} file
 * @returns {boolean}
 */
const minifyFile = async (image) => {
  try {
    const oldSize = await fileSystem.getFileSize(image);
    await tinify.fromFile(image).toFile(image);
    const optimizedSize = await fileSystem.getFileSize(image);

    logger.info(`Minified image ${image}. From: ${yellow(oldSize)} to ${green(optimizedSize)}`);

    return image;
  } catch (err) {
    throw new Error(`${err.message}: ${image}`);
  }
};

/**
 * Main function. Validates if a given dir has images, clones it,
 * gets all its images and finally minify all of them, putting the results
 * in the cloned dir. That way the original dir stays intact.
 *
 * @param {string} dir
 */
const run = async (dir) => {
  logger.info('[Started]');

  await fileSystem.checkIfDirHasImages(dir);

  logger.info('Cloning directory');
  const optimizedDir = await fileSystem.cloneDir(dir);

  logger.info('Cleaning cloned directory');
  const nonImageFiles = await fileSystem.getNonImageFilesFromDir(optimizedDir);
  await fileSystem.deleteNonImageFiles(nonImageFiles);

  const images = await fileSystem.getImagesFromDir(optimizedDir);
  const minifiedImages = await Promise.all(images.map(minifyFile));

  logger.info(`Total of minified images: ${green(minifiedImages.length)}`);
  logger.info('[Finished]');
};

/**
 * Sets and validates a Tinify API key. Throws an error if key is not valid.
 *
 * @param {string} apiKey
 */
const setAndValidateApiKey = async (apiKey) => {
  tinify.key = apiKey;

  await tinify.validate();
};

module.exports = {
  getCompressionCount,
  run,
  setAndValidateApiKey,
};
