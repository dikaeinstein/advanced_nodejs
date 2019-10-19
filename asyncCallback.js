const fs = require('fs');

const readFileAsArray = (file, cb) => {
  return new Promise((resolve, reject) => {
    fs.readFile(file, (err, data) => {
      if (err) {
        reject(err);
        return cb(err);
      }
  
      const lines = data.toString().trim().split('\n');
      resolve(lines);
      cb(lines);
    });
  });
};

readFileAsArray('./numbers')
  .then(data => {
    const numbers = data.map(Number);
    const oddNumbers = numbers.filter(number => number % 2 === 1);
    console.log('odd numbers count is: ', oddNumbers.length);
  })
  .catch(err => { throw err; });
