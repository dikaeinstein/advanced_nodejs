const fs = require('fs');
const crypto = require('crypto');
const zlib = require('zlib');

const file = process.argv[2];

fs.createReadStream(file)
  .pipe(crypto.createDecipher('aes128', 'secret'))
  .pipe(zlib.createGunzip())
  .on('data', () => process.stdout.write('.'))
  .pipe(fs.createWriteStream(`${file.slice(0, -3)}`))
  .on('finish', () => console.log('Done.'))
