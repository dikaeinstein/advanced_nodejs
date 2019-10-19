const server = require('http').createServer();

const pid = process.pid;

server.on('request', (req, res) => {
  for(let i = 0; i < 1e7; i++); // simulate CPU work
  res.end(`Handled by process: ${pid}`);
});

server.listen(8000, () => console.log('Started process:', pid));

// process.on('message', msg => {
//   console.log(`Message from master: ${msg}`);
// });

// setTimeout(() => {
//   process.exit(1); // Kill server after random timeout
// }, Math.random() * 10000);
