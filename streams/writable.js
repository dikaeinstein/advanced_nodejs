const { Writable } = require('stream');

class OutStream extends Writable {

  _write(chunk, encoding, callback) {
    console.info(chunk.toString());
    callback();
  }
}

// Write the data to the supplied writable stream one million times.
// Be attentive to back-pressure.
/**
 *
 * @param {Writable} writer
 * @param {*} data
 * @param {string} encoding
 * @param {(err: Error) => void} callback
 */
function writeOneMillionTimes(writer, data, encoding, callback) {
  let i = 1000000;
  write();
  function write() {
    let ok = true;
    do {
      i--;
      if (i === 0) {
        // Last time!
        writer.write(data, encoding, callback);
      } else {
        // See if we should continue, or wait.
        // Don't pass the callback, because we're not done yet.
        ok = writer.write(data, encoding);
      }
    } while (i > 0 && ok);
    if (i > 0) {
      // Had to stop early!
      // Write some more once it drains.
      writer.once('drain', write);
    }
  }
}


if (require.main === module) {
  // Run as script
  // const outStream = new OutStream();
  // process.stdin.pipe(outStream);
  writeOneMillionTimes(process.stdout, 'test', 'utf-8',
    err => console.error(err));
}

module.exports = OutStream;
