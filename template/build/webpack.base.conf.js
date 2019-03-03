var path = require('path')
var MpxWebpackPlugin = require('@mpxjs/webpack-plugin')

function resolve (dir) {
  return path.join(__dirname, '..', dir)
}

var webpackConf = {
  module: {
    rules: [
      {
        test: /\.mpx$/,
        use: MpxWebpackPlugin.loader({
          transRpx: {
            mode: 'only',
            comment: 'use rpx',
            include: resolve('src')
          }
        })
      },
      {
        test: /\.js$/,
        loader: 'babel-loader',
        include: [resolve('src'), resolve('test'), resolve('node_modules/@mpxjs')]
      },
      {
        test: /\.json$/,
        resourceQuery: /__component/,
        type: 'javascript/auto'
      },
      {
        test: /(\.wxs|\.sjs|\.filter\.js)$/,
        use: MpxWebpackPlugin.wxsLoader(),
        type: 'javascript/auto',
        issuer: /(\.wxml|\.mpx)$/
      },
      {
        test: /\.(png|jpe?g|gif|svg)$/,
        loader: '@mpxjs/url-loader',
        options: {
          name: 'img/[name].[ext]',
          limit: 10000
        }
      }
    ]
  },
  output: {
    filename: '[name].js'
  },
  optimization: {
    runtimeChunk: {
      name: 'bundle'
    },
    splitChunks: {
      cacheGroups: {
        bundle: {
          chunks: 'all',
          name: 'bundle',
          minChunks: 2
        }
      }
    }
  },
  mode: 'none',
  plugins: [
    new MpxWebpackPlugin({
      mode: '<$ mode $>'
    })
  ],
  resolve: {
    extensions: ['.js', '.mpx'],
    modules: ['node_modules']
  }
}

module.exports = webpackConf
