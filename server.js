const fs = require('fs');
const server = require('http').createServer();

server.on('request', (req, res) => {
  const path = req.url;
  switch (path) {
    case '/home':
    case '/about':
      res.writeHead(200, { 'Content-Type': 'text/html' });
      res.end(fs.readFileSync(`./${path}.html`));
      break;
    case '/':
      res.writeHead(301, { 'Location': '/home' });
      res.end();
    default:
      res.writeHead(404);
      res.end();
      break;
  }
});

server.listen(8000);
