const { Readable } = require('stream');

class InStream extends Readable {
  constructor(options) {
    super(options);
    this.currentCharCode = 65;
  }

  _read(size) {
    setTimeout(() => {
      if (this.currentCharCode > 90) {
        this.push('\n')
        this.push(null);
        return;
      }
      this.push(String.fromCharCode(this.currentCharCode++));
    }, 100);
  }
}


if (require.main === module) {
  const inStream = new InStream();
  inStream.pipe(process.stdout);

  process.on('exit', code => {
    console.log(`\n\ncurrentCharCode: ${inStream.currentCharCode}`);
    console.info('Exit code:', code);
  });

  process.stdout.on('error', process.exit);
}

module.exports = InStream;
