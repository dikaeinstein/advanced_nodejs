const fs = require('fs');
const path = require('path');

const dirname = path.join(__dirname, 'files');

const logWithTime = message =>
  console.log(`${new Date().toUTCString()}: ${message}`);

const currentFiles = fs.readdirSync(dirname);

const fsWatcher = fs.watch(dirname, (event, filename) => {
  const index = currentFiles.indexOf(filename);
  if (event === 'rename') {
    if (index >= 0) {
      currentFiles.splice(index, 1);
      logWithTime(`${filename} was deleted`);
      return;
    } else {
      currentFiles.push(filename);
      logWithTime(`${filename} was added`);
      return;
    }
  }
});

fsWatcher.on('change', (event, filename) => {
  logWithTime(`${filename} was changed`);
});

fsWatcher.on('error', console.error);
