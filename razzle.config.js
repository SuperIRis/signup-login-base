const modifyBuilder = require('razzle-plugin-postcss').default;
const fs = require('fs');
require('postcss-modules-values');

const cssConfig = {
  postcssPlugins: [
    require('postcss-modules-values'),
    
  ],
};
const modify = modifyBuilder({ cssConfig });


module.exports = {
  //plugins: [{ func: modify }],
  modify:(config, {target,dev}, webpack)=>{
    if(!config.devServer){
      config.devServer = {};
    }
    config.devServer.https = {
      key: fs.readFileSync('./ssl2/localhost+2-key.pem'),
      cert: fs.readFileSync('./ssl2/localhost+2.pem'),
    };
    config.plugins = [...config.plugins, require('postcss-modules-values')];
    config.node = {
      'fs':'empty' //this is to prevent webpack to attempt to load fs module in the bundle for client app (we are using it conditionally only on server)
    }
    return config;
  }
};
