/**
 * Node modules
 */
const dotenv = require('dotenv');
const assert = require('assert');

dotenv.config({ path: 'variables.env' });

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
