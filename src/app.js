/**
 * Local modules
 */
const Logger = require('./helpers/logger');
const FileSystem = require('./helpers/file');

/**
 * Node modules
 */
const tinify = require('tinify');
const path = require('path');
const fs = require('fs');
const { promisify } = require('util');

const readdirAsync = promisify(fs.readdir);
const lstatAsync = promisify(fs.lstat);

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
  static async setApiKey(apiKey) {
    tinify.key = apiKey;

    await tinify.validate();
  }

  /**
   * Main method of the class. Starts all the process by validating the given dir,
   * cloning it and, afterwards, minifying all its files recursively.
   *
   * @static
   * @param {string} dir
   *
   * @memberof Application
   */
  static async run(dir) {
    if (!path.isAbsolute(dir)) throw new Error('Given path is not an absolute path');

    Logger.info('Starting process...');

    const optimizedDir = await FileSystem.cloneDir(dir);
    Logger.info('Created optimized dir');

    const results = await Application.readDirRecursively(optimizedDir);
    const totalOfMinifiedFiles = results.filter(isFile => !!isFile).length;

    Logger.info(`${totalOfMinifiedFiles} file(s) minified!`);
  }

  /**
   * Reveives a given dir and checks it recursively in order to find all its files.
   *
   * @static
   * @param {string} optimizedDir
   * @returns {array}
   *
   * @memberof Application
   */
  static async readDirRecursively(optimizedDir) {
    try {
      const contents = await readdirAsync(optimizedDir);

      const results = contents.map(content => Application.addToQueue(optimizedDir, content));

      return await Promise.all(results);
    } catch (err) {
      throw new Error(err.message);
    }
  }

  /**
   * Checks if given path is another dir or a file and returns it based on the result
   * to a queue (array of promises), which will be executed afterward.
   *
   * @static
   * @param {string} optimizedDir
   * @param {string} content
   * @returns {Promise}
   *
   * @memberof Application
   */
  static async addToQueue(optimizedDir, content) {
    const currentPath = `${optimizedDir}/${content}`;

    const pathStats = await lstatAsync(currentPath);

    if (pathStats.isFile()) {
      return Application.minifyFile(currentPath);
    }

    return Application.readDirRecursively(currentPath);
  }

  /**
   * Receives a file, checks if it's an image and minifies it afterward.
   *
   * @static
   * @param {string} file
   * @returns {boolean}
   *
   * @memberof Application
   */
  static async minifyFile(file) {
    try {
      if (!FileSystem.isImage(file)) {
        Logger.error(`Oops! "${file}" is not a valid image.`);
        return false;
      }

      await tinify.fromFile(file).toFile(file);

      Logger.info(`Minified image: ${file}`);
      return true;
    } catch (err) {
      throw new Error(err.message);
    }
  }
}

module.exports = Application;
