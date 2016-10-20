require('colors');


const os = require('os');
const ifaces = os.networkInterfaces();
const ngrok = require('ngrok');
const port = process.env.PORT || 8080;
const getIP = new Promise((resolve)=> {
  Object.keys(ifaces).forEach(function (ifname) {
    var alias = 0;

    ifaces[ifname].forEach(function (iface) {
      if ('IPv4' !== iface.family || iface.internal !== false) {
        // skip over internal (i.e. 127.0.0.1) and non-ipv4 addresses
        return;
      }
      if (ifname == 'en0') {
        resolve(`http://${iface.address}`);
      }
    });
    // resolve();
  });
})

ngrok.connect(port, (innerErr, url) => {
  if (innerErr) {
    return console.log(innerErr);
  }
  console.log(`\n\n`);
  console.log(`\n\n`);

  getIP
    .then((res)=> {
      console.log(`\n\n${url}`.bold.grey);
      console.log(`http://localhost:${port}`.bold.green);
      console.log(`${res}:${port}`.bold.blue);
    })

  console.log(`\n\n`);
  console.log(`\n\n`);
  console.log(`\n\n`);

});



