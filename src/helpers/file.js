/**
 * @name FileSystem
 * @description Used as a helper to work with FileSystem tasks.
 * @author Patrick Ferreira <paatrickferreira@gmail.com>
 */

const path = require('path');
const util = require('util');
const fsUnlink = util.promisify(require('fs').unlink);
const fsLstat = util.promisify(require('fs').lstat);
const glob = util.promisify(require('glob'));
const ncp = util.promisify(require('ncp').ncp);

/**
 * Converts bytes to different kind of formats based on its size.
 *
 * @param {int} bytes
 * @returns {string}
 */
const bytesToSize = (bytes) => {
  const sizes = ['Bytes', 'KB', 'MB', 'GB', 'TB'];
  if (bytes === 0) return 'n/a';

  const i = parseInt(Math.floor(Math.log(bytes) / Math.log(1024)), 10);
  if (i === 0) return `${bytes} ${sizes[i]})`;

  return `${(bytes / (1024 ** i)).toFixed(1)} ${sizes[i]}`;
};

/**
 * Clones the origial dir with a "-tinyme-optimized" prefix at the same level of the
 * original dir.
 *
 * @param {string} dir
 * @param {string} [prefix='tinyme-optimized']
 * @returns {string}
 *
 * @see {@link https://github.com/AvianFlu/ncp} for NCP module information.
 */
const cloneDir = async (dir, prefix = 'tinyme-optimized') => {
  const originalDir = path.resolve(dir);
  const clonedDir = `${originalDir}-${prefix}`;

  try {
    await ncp(originalDir, clonedDir, { clobber: false });
  } catch (err) {
    throw new Error('Could not clone directory. Please check if it\'s correct.');
  }

  return clonedDir;
};

/**
 * Uses glob to recursively check if a given directory has images.
 *
 * @param {string} dir
 *
 * @see {@link https://github.com/isaacs/node-glob} for Glob module information.
 */
const checkIfDirHasImages = async (dir) => {
  const images = await glob(`${dir}/**/*.+(png|jpg|jpeg)`);
  if (!images.length) {
    throw new Error('Directory has no images or is not correct');
  }
};

/**
 * Uses glob to get all non-image files from a given directory
 * and deletes all of them afterward.
 *
 * @param {string} dir
 *
 * @see {@link https://github.com/isaacs/node-glob} for Glob module information.
 */
const deleteNonImageFiles = async (dir) => {
  const files = await glob(`${dir}/**/*.!(png|jpg|jpeg)`);
  files.map(file => fsUnlink(file));
};

/**
 * Gets the formatted size of a given file.
 *
 * @param {string} file
 * @return {string} formatted file size
 */
const getFileSize = async (file) => {
  const fileStats = await fsLstat(file);

  return bytesToSize(fileStats.size);
};

/**
 * Uses Glob to get all images from a given directory.
 *
 * @param {string} dir
 * @returns {string}
 *
 * @see {@link https://github.com/isaacs/node-glob} for Glob module information.
 */
const getImagesFromDir = async dir => glob(`${dir}/**/*.+(png|jpg|jpeg)`);

module.exports = {
  cloneDir,
  checkIfDirHasImages,
  deleteNonImageFiles,
  getFileSize,
  getImagesFromDir,
};
