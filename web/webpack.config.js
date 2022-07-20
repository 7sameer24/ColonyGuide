const path = require('path');

const webpack = require('webpack');
const HtmlWebpackPlugin = require('html-webpack-plugin');

const appDirectory = path.resolve(__dirname);

const compileNodeModules = [
  // Add every react-native package that needs compiling
  'react-native-gesture-handler',
  'react-native-elements',
  'react-native-ratings',
  'react-native-vector-icons',
  'react-native-maps',
  '@react-native-community/push-notification-ios',
  'react-native-element-dropdown',
  'react-native-image-picker',
  'react-native-webview',
  'react-native-reanimated',
  'react-native',
].map(moduleName =>
  path.resolve(appDirectory, `../node_modules/${moduleName}`),
);

const babelLoaderConfiguration = {
  test: /\.js$/,
  // Add every directory that needs to be compiled by Babel during the build.
  include: [
    path.resolve(__dirname, 'index.web.js'), // Entry to your application
    path.resolve(__dirname, 'App.web.js'), // Change this to your main App file
    path.resolve(__dirname, '../src'),
    path.resolve(__dirname, '../Context'),
    ...compileNodeModules,
  ],
  use: {
    loader: 'babel-loader',
    options: {
      cacheDirectory: true,
      presets: ['module:metro-react-native-babel-preset'],
      plugins: ['react-native-web'],
    },
  },
};

const svgLoaderConfiguration = {
  test: /\.svg$/,
  use: [
    {
      loader: '@svgr/webpack',
    },
  ],
};

const imageLoaderConfiguration = {
  test: /\.(gif|jpe?g|png)$/,
  use: {
    loader: 'url-loader',
    options: {
      name: '[name].[ext]',
    },
  },
};
const ttfLoaderConfig = {
  test: /\.ttf$/,
  loader: 'url-loader', // or directly file-loader
  include: [...compileNodeModules],
};
const txLoaderConfig = {
  test: /\.tsx?$/,
  include: [...compileNodeModules],
  use: [
    {
      loader: 'babel-loader',
      options: {
        presets: ['solid'],
        configFile: '../tsconfig.json',
      },
    },
    {
      loader: 'ts-loader',
    },
  ],
};

module.exports = {
  entry: {
    app: path.join(__dirname, 'index.web.js'),
  },
  output: {
    path: path.resolve(appDirectory, 'dist'),
    filename: 'bundle.web.js',
  },
  resolve: {
    alias: {
      'react-native$': 'react-native-web',
    },
    extensions: [
      '.web.tsx',
      '.web.ts',
      '.tsx',
      '.ts',
      '.web.jsx',
      '.web.js',
      '.jsx',
      '.js',
    ],
  },
  module: {
    rules: [
      babelLoaderConfiguration,
      imageLoaderConfiguration,
      svgLoaderConfiguration,
      ttfLoaderConfig,
      txLoaderConfig,
    ],
  },
  plugins: [
    new HtmlWebpackPlugin({
      template: path.join(__dirname, 'index.html'),
    }),
    new webpack.HotModuleReplacementPlugin(),
    new webpack.DefinePlugin({
      // See: https://github.com/necolas/react-native-web/issues/349
      __DEV__: JSON.stringify(true),
    }),
  ],
};
