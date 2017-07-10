/**
 * Node modules
 */
const path = require('path');
const util = require('util');
const ncp = util.promisify(require('ncp').ncp);

/**
 * FileSystem helper.
 *
 * @class FileSystem
 * @package Helpers
 * @author Patrick Ferreira <paatrickferreira@gmail.com>
 */
class FileSystem {
  /**
   * Checks if a file is an image based on a list of valid extensions.
   *
   * @static
   * @param {string} file
   * @returns {boolean}
   *
   * @memberof FileSystem
   */
  static isImage(file) {
    const ext = file.split('.').pop().toLocaleLowerCase();

    const validExtensions = ['png', 'jpg', 'jpeg'];

    return validExtensions.includes(ext);
  }

  /**
   * Clones the origial dir with a "-tinyme-optimized" prefix at the same level of the
   * original dir.
   *
   * @static
   * @param {string} dir
   * @param {string} [prefix='tinyme-optimized']
   * @returns {string}
   *
   * @see {@link https://github.com/AvianFlu/ncp} for NCP module information.
   * @memberof FileSystem
   */
  static async cloneDir(dir, prefix = 'tinyme-optimized') {
    const originalDir = path.resolve(dir);

    const clonedDir = `${originalDir}-${prefix}`;

    try {
      await ncp(originalDir, clonedDir, { clobber: false });
    } catch (err) {
      throw new Error('Could not clone given dir. Please check if it exists.');
    }

    return clonedDir;
  }
}

module.exports = FileSystem;
