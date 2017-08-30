const test = require('tape');
const api = require('../../src/helpers/api');
const { readFileSync } = require('fs');
const globalModulesPath = require('global-modules');
const { config } = require('dotenv');

test('is API key being correctly set?', (assert) => {
  const testPath = `${globalModulesPath}/tinyme`;
  const testEnvFile = 'variables_test.env';
  const testEnvVarName = 'TINYME_TEST_API_KEY';
  const testApiKey = 'TEST_API_KEY';

  const testEnvApiKey = `${testEnvVarName}="${testApiKey}"`;

  api.save(testApiKey, testPath, testEnvFile, testEnvVarName);
  const settedEnvApiKey = readFileSync(`${testPath}/${testEnvFile}`).toString();

  assert.equal(testEnvApiKey, settedEnvApiKey, 'API has been set correctly');
  assert.end();
});

test('is API key being correctly read?', (assert) => {
  const testPath = `${globalModulesPath}/tinyme`;
  const testEnvFile = 'variables_test.env';
  const testEnvVarName = 'TINYME_TEST_API_KEY';

  config({ path: `${testPath}/${testEnvFile}` });
  const envApiKey = process.env[testEnvVarName];
  const apiKey = api.retrieve(testPath, testEnvFile, testEnvVarName);

  assert.equal(apiKey, envApiKey, 'API key is being correctly returned');
  assert.end();
});
