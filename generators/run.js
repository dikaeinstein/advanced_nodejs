const util     = require('util');
const fs       = require('fs');
const { once } = require('events');

const finished = util.promisify(stream.finished);

const writable = fs.createWriteStream('./file');

(async function() {
  for await (const chunk of iterator) {
    // Handle backpressure on write().
    if (!writable.write(chunk))
      await once(writable, 'drain');
  }

  writable.end();
  // Ensure completion without errors.
  await finished(writable);
})();

const promisifiedSetTimeout = util.promisify(setTimeout);

function promisifiedTimeout(timeout) {
  return new Promise((resolve, reject) => {
    try {
      setTimeout(resolve, timeout);
    } catch (error) {
      reject(error);
    }
  });
}

function *asyncGenerator() {
  try {
    yield promisifiedTimeout(2000);
    console.log('slept for 2s');
    yield promisifiedSetTimeout(3000);
    console.log('slept for 3s');
  } catch (error) {
    console.error(error);
  }
}

/**
 * Run or schedule generator functions
 * @param {() => Generator<Promise, Promise, Boolean>} gen
 */
const run = (gen, ...args) => {
  // initialize the generator in the current context
  const iterator = gen(...args);

  // return a promise for the generator completing
  return Promise.resolve()
    .then(function handleNext(value) {
      // run to the first yielded value
      let result = iterator.next(value);

      return (function handleResult(result) {
        if (result.done) {
          return result.value;
        }

        return Promise.resolve(result.value)
          .then(handleNext)
          // if `value` is a rejected
          // promise, propagate error back
          // into the generator for its own
          // error handling
          .catch((err) => {
            return Promise.resolve(iterator.throw(err))
              .then(handlerResult);
          })
      })(result);
    })
};

if (require.main === module) {
  // promisifiedTimeout(2000)
  //   .then(() => console.log('slept for 2s'))
  //   .catch(err => console.error(err));

  // promisifiedSetTimeout(3000)
  //   .then(() => console.log('slept for 3s'))
  //   .catch(err => console.error(err));

  run(asyncGenerator);
}
