const test = require('tape');
const fileSystem = require('../../src/helpers/file');

test('are bytes being correctly converted and prefixed?', (assert) => {
  const bytesSizes = [
    { bytes: 0, expected: 'n/a', size: 'n/a' },
    { bytes: 100, expected: '100 Bytes', size: 'Bytes' },
    { bytes: 1024, expected: '1.0 KB', size: 'KB' },
    { bytes: 1048576, expected: '1.0 MB', size: 'MB' },
    { bytes: 1073741824, expected: '1.0 GB', size: 'GB' },
    { bytes: 1099511627776, expected: '1.0 TB', size: 'TB' },
  ];

  bytesSizes.forEach(({ bytes, expected, size }) => {
    assert.equal(expected, fileSystem.bytesToSize(bytes), `Bytes to ${size} is being correctly converted`);
  });

  assert.end();
});
