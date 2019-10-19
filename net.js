const net = require('net');

process.stdout.write('\u001B[2J\u001B[0;0f');

const server = net.createServer();
const sockets = {};
let counter = 0;

server.on('connection', (socket) => {
  socket.setEncoding('utf8');
  socket.id = ++counter;

  console.log('Client connected');
  socket.write('Please type your name: ');

  socket.on('data', data => {
    if (!sockets[socket.id]) {
      socket.name = data.trim();
      socket.write(`Welcome ${socket.name}!\n`);
      sockets[socket.id] = socket;
      return;
    }
    
    Object.entries(sockets).forEach(([key, sock]) => {
      if (key == socket.id) {
        return;
      }
      sock.write(`${socket.name}: ${data}`);
    });
  });

  socket.on('end', () => console.log('Client disconnected'));
});

server.listen(8000, () => console.log('Server bound'));
