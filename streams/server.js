const fs = require('fs');
const server = require('http').createServer();

server.on('request', (req, res) => {
  // fs.readFile('streams/big_file', (err, data) => {
  //   if (err) {
  //     throw err;
  //   }

  //   res.end(data);
  // });
  const src = fs.createReadStream('streams/big_file');
  src.pipe(res);
});

server.listen(8000);
