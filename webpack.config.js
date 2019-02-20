const webpack = require('webpack');
const packageJson = require('./package.json');

const externals = {};
const externalLibs = Object.keys(externals);
const dependencies = Object.keys(packageJson.dependencies);
const vendorDependencies = dependencies.filter(dep => externalLibs.indexOf(dep) === -1);

module.exports = {
  cache: true,
  entry: {
    app: './app/scripts/components/App.jsx',
    vendor: vendorDependencies,
  },
  output: {
    path: './app/scripts',
    filename: '[name].js',
  },
  externals,
  module: {
    loaders: [
      {
        test: /\.jsx$/,
        exclude: '/node_modules/',
        loader: 'babel-loader',
      },
    ],
  },
  resolve: {
    extensions: ['', '.js', '.jsx'],
  },
  plugins: [
    new webpack.optimize.DedupePlugin(),
    new webpack.optimize.OccurenceOrderPlugin(true),
    new webpack.optimize.CommonsChunkPlugin('vendor', 'vendor.bundle.js'),
  ],
};
