const dns = require('dns');

// dns.lookup('pluralsight.com', (err, address) => {
//   if (err) console.error(err);
//   else console.log(address);
// });

dns.resolve4('pluralsight.com', (err, address) => {
  if (err) console.error(err);
  else console.log(address);
});

dns.reverse('54.148.189.217', (err, hostname) => console.log(hostname));
