/**
 * Local modules
 */
const Logger = require('./helpers/logger');
const FileSystem = require('./helpers/file');

/**
 * Node modules
 */
const tinify = require('tinify');

/**
 * Application class
 *
 * Receives a given dir (which should have images) and minify all of them
 * by using the TinyPNG API.
 *
 * @class Application
 * @see {@link https://github.com/tinify/tinify-nodejs} for TinyPNG client information.
 * @author Patrick Ferreira <paatrickferreira@gmail.com>
 */
class Application {
  /**
   * Sets and validates a Tinify API key. Throws an error if key is not valid.
   *
   * @static
   * @param {string} apiKey
   *
   * @memberof Application
   */
  static async setAndValidateApiKey(apiKey) {
    tinify.key = apiKey;

    await tinify.validate();
  }

  /**
   * Main method of the class. Validates if a given dir has images,clones it,
   * get all its images and finally minify all of them, putting the results
   * in the cloned dir. This way the original one stays intact.
   *
   * @static
   * @param {string} dir
   *
   * @memberof Application
   */
  static async run(dir) {
    Logger.info('[Started]');

    await FileSystem.checkIfDirHasImages(dir);

    const optimizedDir = await FileSystem.cloneDir(dir);
    const images = await FileSystem.getImagesFromDir(optimizedDir);
    const minifiedImages = await Promise.all(images.map(image => Application.minifyFile(image)));

    Logger.info(`Total of minified images: ${minifiedImages.length}`);
    Logger.info('[Finished]');
  }

  /**
   * Minifies a given image.
   *
   * @static
   * @param {string} file
   * @returns {boolean}
   *
   * @memberof Application
   */
  static async minifyFile(image) {
    try {
      await tinify.fromFile(image).toFile(image);

      Logger.info(`Minified image ${image}`);

      return image;
    } catch (err) {
      throw new Error(`${err.message}: ${image}`);
    }
  }

  /**
   * Gets the number of already minified images of a specific user. It uses
   * the previously set API key to check this information.
   *
   * @static
   * @returns {string}
   *
   * @memberof Application
   */
  static async getCompressionCount() {
    return tinify.compressionCount;
  }
}

module.exports = Application;
