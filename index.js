// console.log(arguments);

// const findMe = require('findMe');
const addon = require('addon.node');
console.log(require.cache);

// console.log('In index.js');
// console.log(module);
// console.log(findMe);
console.log(addon.hello());

// setImmediate(() => {
//   // console.log(findMe);
//   console.log(module);
// });
