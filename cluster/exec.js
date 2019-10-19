const { exec } = require('child_process');
const util = require('util');

const promisifiedExec = util.promisify(exec);

promisifiedExec('ls')
  .then(ls => console.log('stdout:', ls.stdout))
  .catch(ls => console.error('stderr:', ls.stderr))
