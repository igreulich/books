var webpack = require('webpack');

var externals          = {};
var externalLibs       = Object.keys(externals);
var packageJson        = require('./package.json');
var dependencies       = Object.keys(packageJson.dependencies);
var vendorDependencies = dependencies.filter(function(dep) {
  return externalLibs.indexOf(dep) === -1;
});

module.exports = {
  cache: true,
  entry: {
    app:    './app/scripts/components/App.jsx',
    vendor: vendorDependencies
  },
  output: {
    path: './app/scripts',
    filename: '[name].js'
  },
  externals: externals,
  module: {
    loaders: [
      {
        test:    /\.jsx$/,
        exclude: '/node_modules/',
        loader:  'babel-loader' 
      }
    ]
  },
  resolve: {
    extensions: ['', '.js', '.jsx']
  },
  plugins: [
    new webpack.optimize.DedupePlugin(),
    new webpack.optimize.OccurenceOrderPlugin(true),
    new webpack.optimize.CommonsChunkPlugin('vendor', 'vendor.bundle.js')
  ]
};
