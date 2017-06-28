/**
 * Node modules
 */
const assert = require('assert');
const dotenv = require('dotenv');
const currentPath = process.cwd();

dotenv.config({ path: `${currentPath}/variables.env` });

/**
 * Gets env variables by its name. These variables are extracted by dotenv lib.
 *
 * @class Environment
 * @package Helpers
 * @author Patrick Ferreira <paatrickferreira@gmail.com>
 */
class Environment {
  /**
   * Gets an environment variable property by its name.
   *
   * @static
   * @param {string} prop
   * @returns {string}
   *
   * @memberof Environment
   */
  static getProperty(prop) {
    const result = process.env[prop];
    assert(typeof result !== 'undefined', `Please provide ${prop} in the .env file!`);

    return result;
  }
}

module.exports = Environment;
