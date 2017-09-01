const test = require('tape');
const fileSystem = require('../../src/helpers/file');
const globalModulesPath = require('global-modules');
const fs = require('fs');

const createFilesOnDir = (dir, files) => files.map((file) => {
  const filePath = `${dir}/${file}`;
  fs.closeSync(fs.openSync(filePath, 'w'));

  return filePath;
});

const getTestImages = () => [
  'test-image.png',
  'test-image-2.jpg',
];

const getTestTextFiles = () => [
  'test-file.txt',
  'test-file-2.doc',
  'test-file-3.xls',
];

const deleteDir = (dir, hasFiles = true) => {
  if (!hasFiles) return fs.rmdirSync(dir);

  const files = fs.readdirSync(dir);
  files.forEach(file => fs.unlinkSync(`${dir}/${file}`));

  return fs.rmdirSync(dir);
};

const testDir = `${globalModulesPath}/tinyme/test-dir/`;

test('is given dir being correctly cloned?', async (assert) => {
  fs.mkdirSync(testDir);
  if (!fs.existsSync(testDir)) assert.fail('Test dir could not be created');

  const clonedDir = await fileSystem.cloneDir(testDir);
  if (!fs.existsSync(clonedDir)) assert.fail('Test dir could not be cloned');

  deleteDir(testDir);
  deleteDir(clonedDir);

  assert.pass('Test dir has been correctly cloned');
  assert.end();
});

test('are non-image files being correctly returned?', async (assert) => {
  fs.mkdirSync(testDir);
  const testTextFiles = getTestTextFiles();
  const testImages = getTestImages();
  createFilesOnDir(testDir, testTextFiles.concat(testImages));

  if (!fs.existsSync(testDir)) assert.fail('Test dir could not be created');
  const nonImageFiles = await fileSystem.getNonImageFilesFromDir(testDir);
  deleteDir(testDir, true);

  assert.equal(testTextFiles.length, nonImageFiles.length, 'Non-image files are being correctly returned');
  assert.end();
});

test('are images being correctly returned?', async (assert) => {
  fs.mkdirSync(testDir);

  const testTextFiles = getTestTextFiles();
  const testImages = getTestImages();
  createFilesOnDir(testDir, testTextFiles.concat(testImages));

  if (!fs.existsSync(testDir)) assert.fail('Test dir could not be created');
  const images = await fileSystem.getImagesFromDir(testDir);
  deleteDir(testDir, true);

  assert.equal(testImages.length, images.length, 'Images are being correctly returned');
  assert.end();
});

test('are files being correctly deleted?', async (assert) => {
  fs.mkdirSync(testDir);
  const testTextFiles = getTestTextFiles();
  const testCreatedFiles = createFilesOnDir(testDir, testTextFiles);

  await fileSystem.deleteNonImageFiles(testCreatedFiles);
  const dirContent = fs.readdirSync(testDir);
  if (dirContent.length) assert.fail('Test failed on deleting dir files');

  deleteDir(testDir);

  assert.pass('Files have been correctly deleted');
  assert.end();
});

test('are dir images being correctly checked?', async (assert) => {
  fs.mkdirSync(testDir);
  const testImages = getTestImages();
  const testCreatedFiles = createFilesOnDir(testDir, testImages);

  const hasImages = await fileSystem.checkIfDirHasImages(testDir);
  if (!hasImages) assert.fail('Function failed to idenfity if dir has images or not');
  deleteDir(testDir);

  assert.pass('Images have been correctly found');
  assert.end();
});
