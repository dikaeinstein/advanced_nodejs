const EventEmitter = require('events');


class WithLog extends EventEmitter {
  execute(taskFn) {
    console.log('Before executing');
    this.emit('begin');
    taskFn();
    this.emit('end');
    console.log('After executing');
  }
}


const withLog = new WithLog();
withLog.on('begin', () => console.log('About to execute'));
withLog.on('end', () => console.log('Done with execute'));

withLog.execute(() => console.log('*** Executing task ***'));
