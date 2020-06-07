const nodeFetch = require('node-fetch');

if(!globalThis.fetch && typeof fetch === 'undefined'){
  var fetch = globalThis.fetch = nodeFetch;
}

const request = {
  post(endpoint, data){
    return fetch(endpoint, data)
    .then(res=>res.json())
    .catch((err)=>{
      if (process.env.NODE_ENV==='development'){ 
        console.error(err);
      }
    });
  }
}
export default request;