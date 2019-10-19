const fs = require('fs');
const crypto = require('crypto');
const zlib = require('zlib');
const file = process.argv[2];


fs.createReadStream(file)
  .pipe(zlib.createGzip())
  .pipe(crypto.createCipher('aes128', 'secret'))
  .on('data', () => process.stdout.write('.'))
  .pipe(fs.createWriteStream(`${file}.zz`))
  .on('finish', () => console.log('Done.'));
