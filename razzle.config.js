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
      key: fs.readFileSync('./ssl/example.com+5-key.pem'),
      cert: fs.readFileSync('./ssl/example.com+5.pem'),
    }
    config.plugins = [...config.plugins, require('postcss-modules-values')];
    return config;
  }
};
