/**
 * Node modules
 */
const path = require('path');
const util = require('util');
const glob = util.promisify(require('glob'));
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
      throw new Error('Could not clone directory. Please check if it\'s correct.');
    }

    return clonedDir;
  }

  /**
   * Uses glob to recursively check if a given dir has images.
   *
   * @see {@link https://github.com/isaacs/node-glob} for Glob module information.
   * @param {*} dir
   */
  static async checkIfDirHasImages(dir) {
    const images = await glob(`${dir}/**/*.+(png|jpg|jpeg)`);
    if (!images.length) {
      throw new Error('Directory has no images or is not correct');
    }
  }

  /**
    * Gets all images from a given dir.
    *
    * @see {@link https://github.com/isaacs/node-glob} for Glob module information.
    * @param {string} dir
    */
  static async getImagesFromDir(dir) {
    return glob(`${dir}/**/*.+(png|jpg|jpeg)`);
  }
}

module.exports = FileSystem;
