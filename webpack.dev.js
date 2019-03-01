/* eslint-disable import/no-extraneous-dependencies */

/*
 * TODO: Minimize js, css
 * TODO: Make this THE config, not dev config
 */
const webpack = require('webpack');
const path = require('path');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const Dotenv = require('dotenv-webpack');

const devMode = process.env.NODE_ENV !== 'production';

module.exports = {
  mode: 'development',
  devtool: 'cheap-eval-source-map',
  entry: {
    app: ['react-hot-loader/patch', './src/client/index.js'],
  },
  output: {
    path: path.resolve(__dirname, 'dist'),
    filename: '[name].js',
    publicPath: '/',
  },
  module: {
    rules: [
      { test: /\.(js|jsx)$/, exclude: /node_modules/, loader: 'babel-loader' },
      {
        test: /\.less$/,
        use: [devMode ? 'style-loader' : MiniCssExtractPlugin.loader, 'css-loader', 'less-loader'],
      },
      {
        test: /\.(woff(2)?|ttf|eot|svg|png)(\?v=\d+\.\d+\.\d+)?$/,
        use: [
          {
            loader: 'file-loader',
            options: {
              name: '[name].[ext]',
            },
          },
        ],
      },
    ],
  },
  resolve: {
    extensions: ['.js', '.jsx', '.json'],
  },
  target: 'web',
  devServer: {
    port: 3000,
    contentBase: '/dist',
    publicPath: '/',
    historyApiFallback: true,
    hot: true,
    open: true,
  },
  plugins: [
    new webpack.HotModuleReplacementPlugin(),
    new webpack.NamedModulesPlugin(),
    new MiniCssExtractPlugin({ filename: devMode ? '[name].css' : '[name].[hash].css' }),
    new HtmlWebpackPlugin({
      template: './src/client/templates/index.html',
      title: "Greulich's Books",
    }),
    new Dotenv(),
  ],
};

/* eslint-enable import/no-extraneous-dependencies */
