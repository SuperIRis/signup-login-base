const modifyBuilder = require('razzle-plugin-postcss').default;
require('postcss-modules-values');

const cssConfig = {
  postcssPlugins: [
    require('postcss-modules-values'),
    
  ],
};
const modify = modifyBuilder({ cssConfig });

module.exports = {
  plugins: [{ func: modify }],
};
