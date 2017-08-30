const test = require('tape');
const fileSystem = require('../../src/helpers/file');
const globalModulesPath = require('global-modules');
const { mkdirSync, closeSync, openSync, existsSync, rmdirSync } = require('fs');

test('is given dir being correctly cloned?', async (assert) => {
  const dir = `${globalModulesPath}/tinyme/test-dir/`;
  mkdirSync(dir);
  if (!existsSync(dir)) assert.fail('Test dir could not be created');

  const clonedDir = await fileSystem.cloneDir(dir);
  if (!existsSync(clonedDir)) assert.fail('Test dir could not be cloned');

  rmdirSync(dir);
  rmdirSync(clonedDir);

  assert.pass('Test dir has been correctly cloned');
  assert.end();
});
