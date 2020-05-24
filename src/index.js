//import http from 'http';
import fs from 'fs';
import http from 'https';

const options = {
   key: fs.readFileSync('./ssl/example.com+5-key.pem'),
   cert: fs.readFileSync('./ssl/example.com+5.pem'),
};

let app = require('./server').default;

//change to http if don't need to test in https
const server = http.createServer(options, app);

let currentApp = app;

server.listen(process.env.PORT || 3000, error => {
  if (error) {
    console.log(error);
  }

  console.log('🚀 started');
});

if (module.hot) {
  console.log('✅  Server-side HMR Enabled!');

  module.hot.accept('./server', () => {
    console.log('🔁  HMR Reloading `./server`...');

    try {
      app = require('./server').default;
      server.removeListener('request', currentApp);
      server.on('request', app);
      currentApp = app;
    } catch (error) {
      console.error(error);
    }
  });
}
