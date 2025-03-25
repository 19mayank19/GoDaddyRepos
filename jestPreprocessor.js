const babelPath = __dirname;

const babelConfig = require(`${babelPath}/babel.config.json`);
module.exports = require('babel-jest').createTransformer(babelConfig);