const cluster = require('cluster');
const os = require('os');

if (cluster.isMaster) {
  const numberOfCPUs = os.cpus().length

  for (let i = 0; i < numberOfCPUs; i++) {
    cluster.fork();
  }

  console.log(`Master PID: ${process.pid}`);
  // Object.values(cluster.workers).forEach(worker => {
  //   worker.send(`Hello Worker ${worker.id}`);
  // });
  cluster.on('exit', (worker, code, signal) => {
    if (code !== 0 && !worker.exitedAfterDisconnect) {
      console.log(
        `Worker ${worker.id} crashed.`,
        'Starting a new worker...',
      );
      cluster.fork();
      }
  });

  process.on('SIGUSR2', () => {
    const workers = Object.values(cluster.workers);

    const restartWorker = (workerIndex) => {
      const worker = workers[workerIndex];
      if (!worker) return;
      worker.on('exit', () => {
        if (!worker.exitedAfterDisconnect) return;
        console.log(`Excited process ${worker.process.pid}`);
        cluster.fork().on('listening', () => {
          restartWorker(workerIndex+1);
        });
      });
      worker.disconnect();
    };

    restartWorker(0);
  });
} else {
  require('./server');
}
