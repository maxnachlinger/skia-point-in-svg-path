const os = require('os');
const decompress = require('decompress');

const main = async () => {
  await decompress('include.tar.gz', '.');

  const filename = os.platform() === 'darwin'
    ? './mac.tar.gz'
    : './linux.tar.gz';
  await decompress(filename, '.');
};

main();
