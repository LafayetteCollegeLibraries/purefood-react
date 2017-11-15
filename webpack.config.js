const webpack = require('webpack')
const path = require('path')
const ExtractTextPlugin = require('extract-text-webpack-plugin')

module.exports = () => {
  const nodeEnv = process.env.NODE_ENV
  const isProduction = nodeEnv && nodeEnv.toLowerCase() === 'production'

  const sourceDirectory = isProduction ? 'build' : 'src'
  const pathTo = path.resolve(__dirname, sourceDirectory)

  const config = {
    entry: [
      path.join(pathTo, 'index.js'),
      path.join(pathTo, 'scss', 'main.scss'),
    ],

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
              {
                loader: 'css-loader'
              },
              {
                loader: 'sass-loader',
                options: {
                  includePaths: [
                    path.join(pathTo, 'scss'),
                    path.join(pathTo, 'components'),
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
      new ExtractTextPlugin({
        filename: 'css/style.css',
        allChunks: true,
      })
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

  if (isProduction) {
    config.devtool = 'source-map'
    config.plugins = [].concat(
      new webpack.DefinePlugin({
        'process.env.NODE_ENV': JSON.stringify('production')
      }),

      new webpack.optimize.UglifyJsPlugin({sourceMap: true}),
      
      config.plugins,
    )
  }

  return config
}
