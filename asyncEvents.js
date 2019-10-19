const EventEmitter = require('events');
const fs = require('fs');


class WithTime extends EventEmitter {
  execute(asyncTaskFn, ...args) {
    console.time('execute');
    this.emit('begin');
    asyncTaskFn(...args, (err, data) => {
      if (err) {
        return this.emit('error', err);
      }
      this.emit('data', data);
      console.timeEnd('execute');
      this.emit('end');
    });
  }
}

const withTime = new WithTime();

// withTime.on('error', console.error);
withTime.on('begin', () => console.log('About to execute'));
withTime.on('data', data => console.log(data.toString()));
withTime.on('end', () => console.log('Done with execute'));

process.on('uncaughtException', console.error);

withTime.execute(fs.readFile, '');
withTime.execute(fs.readFile, __filename);
