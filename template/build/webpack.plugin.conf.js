var path = require('path')
var merge = require('webpack-merge')
var MpxWebpackPlugin = require('@mpxjs/webpack-plugin')
var baseWebpackConfig = require('./webpack.base.conf')

var pluginSubDir = 'plugin'

function resolveSrc (file) {
  return path.resolve(__dirname, '../src', pluginSubDir, file || '')
}

function resolveDist (file) {
  return path.resolve(__dirname, '../dist', pluginSubDir, file || '')
}

module.exports = merge(baseWebpackConfig, {
  // entry point of our application
  entry: {
    plugin: resolveSrc('plugin.json')
  },
  module: {
    rules: [
      {
        resource: resolveSrc('plugin.json'),
        use: MpxWebpackPlugin.pluginLoader()

      }
    ]
  },
  output: {
    path: resolveDist(),
  },
  resolve: {
    modules: [resolveSrc()]
  }
})
