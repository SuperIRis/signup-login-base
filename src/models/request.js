import {isNode} from '../utils/utilities';

const options = {}
let projectFetch;

if(isNode()){
  //no fetch
  const https = require('https');
  const fs = require('fs');
  projectFetch = require('node-fetch');
  options.agent = new https.Agent({
    ca: [fs.readFileSync('./ssl2/rootCa.pem')],
    rejectUnauthorized: true,
  });
  
  
}
else{
  projectFetch = window.fetch;
}


const request = {
  post(endpoint, data){
    if (process.env.NODE_ENV === 'development' && endpoint.indexOf('json')!==-1) {
      //in dev we can load a JSON
      options.headers = {
        'Content-Type': 'application/json',
      };
      options.method = 'GET';
    }
    else{
      //in other envs we load an API
      options.method = 'POST';
      options.body = JSON.stringify(data);
    }
    return projectFetch(endpoint, options)
      .then((res) => res.json())
      .catch((err) => {
        if (process.env.NODE_ENV === 'development') {
          console.error(err);
        }
      });
  }
}
export default request;