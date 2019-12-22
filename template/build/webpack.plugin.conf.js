const path = require('path')
const merge = require('webpack-merge')
const MpxWebpackPlugin = require('@mpxjs/webpack-plugin')
const baseWebpackConfig = require('./webpack.conf')

const pluginSubDir = 'plugin'

function resolveSrc (file) {
  return path.resolve(__dirname, '../src', pluginSubDir, file || '')
}

function resolveDist (file) {
  return path.resolve(__dirname, '../dist', pluginSubDir, file || '')
}

const mpxLoaderConfig = {
  transRpx: {
    mode: 'only',
    comment: 'use rpx',
    include: resolveSrc()
  }
}

module.exports = merge(baseWebpackConfig, {
  name: 'plugin-compile',
  // entry point of our application
  entry: {
    plugin: resolveSrc('plugin.json')
  },
  module: {
    rules: [
      {
        resource: resolveSrc('plugin.json'),
        use: MpxWebpackPlugin.pluginLoader()
      },
      {
        test: /\.mpx$/,
        use: MpxWebpackPlugin.loader(mpxLoaderConfig)
      }
    ]
  },
  plugins: [
    new MpxWebpackPlugin({
      mode: '<$ mode $>'
    })
  ],
  output: {
    path: resolveDist(),
  }
})
