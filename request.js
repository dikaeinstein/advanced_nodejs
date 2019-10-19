const http = require('http');
const fs = require('fs');

const req = http.get('http://www.google.com', (res) => {
  res.on('data', data => {
    // fs.writeFile('./google.html', , error => {
    //   if (error) {
    //     console.error(error);
    //   }
    // });
    console.log(data.toString());
  });
});

req.on('error', console.error);
