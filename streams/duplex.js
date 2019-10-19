const { Duplex } = require('stream');

class InOutStream extends Duplex {
  constructor(options) {
    super(options);
    this.currentCharCode = 65;
  }

  _write(chunk, encoding, callback) {
    console.log(chunk.toString());
    callback();
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

const inOutStream = new InOutStream();
process.stdin.pipe(inOutStream).pipe(process.stdout);
