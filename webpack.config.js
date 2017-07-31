const webpack = require('webpack')
const path = require('path')
const ExtractTextPlugin = require('extract-text-webpack-plugin')

module.exports = {
  entry: './src/index.js',

  output: {
    filename: 'bundle.js',
    path: path.resolve(__dirname, 'public'),
  },

  module: {
    rules: [
      {
        test: /\.js$/,
        use: 'babel-loader',
      },
      {
        test: /\.s?css$/,
        use: ExtractTextPlugin.extract({
          fallback: 'style-loader',
          use: [
            { loader: 'css-loader' },
            {
              loader: 'sass-loader',
              options: {
                includePaths: [
                  'src/scss',
                  'node_modules',
                ],
                sourceMapEmbed: true,
              }
            },
          ]
        }),
      }
    ],
  },

  plugins: [
    new ExtractTextPlugin('styles.css'),
  ],

  resolve: {
    alias: {
      // we need to stub out jquery, as react-bootstrap-slider has it as an optional
      // dependency, which will throw an error when it isn't found.
      // see: https://github.com/seiyria/bootstrap-slider#how-do-i-exclude-the-optional-jquery-dependency-from-my-build
      'jquery': path.resolve(__dirname, 'jquery-stub.js'),
    },
  },

  devServer: {
    contentBase: path.join(__dirname, 'public'),
    compress: true,
    historyApiFallback: true,
  },
}
