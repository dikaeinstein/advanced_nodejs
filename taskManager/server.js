const EventEmitter = require('events');

class Server extends EventEmitter {
  constructor(client) {
    super();
    this.tasks = {};
    this.taskId = 1;
    process.nextTick(() => {
      this.emit('response', 'Type a command (help to list command)');
    });
    this.handleCommand = this.handleCommand.bind(this);
    client.on('command', this.handleCommand);
  }

  handleCommand(command, args) {
    switch (command) {
      case 'help':
      case 'list':
      case 'add':
      case 'delete':
        this[command](args);
        break;
      default:
        this.emit('response', 'Unknown command...');
    }
  }

  help() {
    this.emit('response', `Available commands:
  add task
  list
  delete :id`);
  }

  list() {
    this.emit('response', 'list ...' );
  }

  add(args) {
    this.tasks[this.taskId] = args.join(' ');
    this.emit('response', `Added task: ${this.tasks[this.taskId]}`);
    this.taskId++
  }

  delete(args) {
    const taskId = args[0];
    const { [taskId]: id, ...tasks } = this.tasks;
    this.tasks = tasks;
    this.emit('response', `Deleted task: ${taskId}`);
  }
}

module.exports = { newServer: client => new Server(client) };
