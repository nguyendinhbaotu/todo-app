'use strict';

// Modules
var webpack = require('webpack');
var autoprefixer = require('autoprefixer');
var HtmlWebpackPlugin = require('html-webpack-plugin');
var ExtractTextPlugin = require('extract-text-webpack-plugin');
var CopyWebpackPlugin = require('copy-webpack-plugin');

module.exports = function makeWebpackConfig() {

  var config = {};

  config.entry = {
    app: './src/app/app.js'
  };

  config.output = {
    path: __dirname + '/dist',
    publicPath: 'http://localhost:8080/',
    filename: '[name].bundle.js',
    chunkFilename: '[name].bundle.js'
  };

  config.devtool = 'eval-source-map';

  config.module = {
    rules: [{
      test: /\.js$/,
      loader: 'babel-loader',
      exclude: /node_modules/
    },
    {
      test: /\.css$/,
      loader: ExtractTextPlugin.extract({
        fallbackLoader: 'style-loader',
        loader: [
          { loader: 'css-loader', query: { sourceMap: true } },
          { loader: 'postcss-loader' }
        ],
      })
    },
    {
      test: /\.scss$/,
      loader: ExtractTextPlugin.extract(['raw-loader', 'sass-loader'])
    },
    {
      test: /\.(png|jpg|jpeg|gif|svg|woff|woff2|ttf|eot)$/,
      loader: 'file-loader'
    },
    {
      test: /\.html$/,
      loader: 'raw-loader'
    }]
  };

  /**
   * PostCSS
   * Reference: https://github.com/postcss/autoprefixer-core
   * Add vendor prefixes to your css
   */
  // NOTE: This is now handled in the `postcss.config.js`
  //       webpack2 has some issues, making the config file necessary

  /**
   * Plugins
   * Reference: http://webpack.github.io/docs/configuration.html#plugins
   * List: http://webpack.github.io/docs/list-of-plugins.html
   */
  config.plugins = [
    new webpack.LoaderOptionsPlugin({
      test: /\.scss$/i,
      options: {
        postcss: {
          plugins: [autoprefixer]
        }
      }
    })
  ];

  config.plugins.push(
    new HtmlWebpackPlugin({
      template: './src/public/index.html',
      inject: 'body'
    }),

    // Reference: https://github.com/webpack/extract-text-webpack-plugin
    // Extract css files
    // Disabled when in test mode or not in build mode
    new ExtractTextPlugin({ filename: 'css/[name].css', disable: true, allChunks: true })
  )

  config.devServer = {
    contentBase: './src/public',
    stats: 'minimal'
  };

  return config;
}();
