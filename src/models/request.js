import { isNode } from '../utils/utilities';

const options = {};

function getFetch() {
  let projectFetch;
  if (isNode() && !global.fetch) {
    //no fetch
    const https = require('https');
    const fs = require('fs');
    projectFetch = require('node-fetch');
    options.agent = new https.Agent({
      ca: [fs.readFileSync('./ssl2/rootCa.pem')],
      rejectUnauthorized: true,
    });
  } else {
    projectFetch = global.fetch || window.fetch;
  }
  return projectFetch;
}

const request = {
  post(endpoint, data) {
    if (process.env.NODE_ENV === 'development' && endpoint.indexOf('json') !== -1) {
      //in dev we can load a JSON
      options.headers = {
        'Content-Type': 'application/json',
      };
      options.method = 'GET';
    } else {
      //in other envs we load an API
      options.method = 'POST';
      options.body = JSON.stringify(data);
    }
    return getFetch()(endpoint, options)
      .then((res) => res.json())
      .catch((err) => {
        if (process.env.NODE_ENV === 'development') {
          console.error(err);
        }
      });
  },
};
export default request;
