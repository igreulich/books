module.exports = {
  entry: './app/scripts/components/App.jsx',
  output: {
    path: './app/scripts',
    filename: 'app.js'
  },
  module: {
    loaders: [
      { test: /\.jsx$/, loader: 'babel-loader' }
    ]
  },
  resolve: {
    extensions: ['', '.js', '.jsx']
  },
  externals: {
    'react-bootstrap': 'ReactBootstrap'
  }
};
