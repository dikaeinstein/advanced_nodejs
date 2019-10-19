const { spawn } = require('child_process');

const find = spawn('find', ['.', '-type', 'f']);
const wc = spawn('wc', ['-l']);

find.stdout.pipe(wc.stdin);

// find.stdout.on('data', data => {
//   console.log(`child.stdout: ${data}`);
// });

find.stderr.on('data', data => {
  console.error(`find.stderr: ${data}`);
});

wc.stdout.on('data', data => {
  console.log(`wc.stdout: ${data}`);
})

wc.on('exit', (code, signal) => {
  console.log(`wc process exited with ${code}, signal ${signal}`);
});

find.on('exit', (code, signal) => {
  console.log(`find process exited with ${code}, signal ${signal}`);
});
