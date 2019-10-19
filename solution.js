const fs = require('fs');
const path = require('path');
const dirname = path.join(__dirname, 'duplicate');

const files = fs.readdirSync(dirname);

console.log(files);

files.forEach((file) => {
  const filePath = path.join(dirname, file);
  fs.stat(filePath, (err, stat) => {
    if (err) {
      throw err;
    }

    fs.truncate(filePath, stat.size / 2, err => {
      if (err) {
        throw err;
      }
    });
  });
});