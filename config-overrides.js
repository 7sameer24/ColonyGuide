const path = require('path');
const {override, addBabelPlugins, babelInclude} = require('customize-cra');

module.exports = override(
  babelInclude([
    path.resolve('src'), // your src folder can be another
    path.resolve('node_modules/react-native-elements'),
    path.resolve('node_modules/react-native-ratings'),
    path.resolve('node_modules/react-native-status-bar-height'), // <- I'm not sure that this is necessary
    path.resolve('node_modules/react-native-vector-icons'),
  ]),
  addBabelPlugins('@babel/plugin-proposal-class-properties'),
);
