const { merge } = require('webpack-merge')
const getRules = require('./getRules')
const getPlugins = require('./getPlugins')
const { userConf } = require('../config/index')
const baseWebpackConf = require('./webpack.base.conf')
const path = require('path')

const options = Object.assign({
  mode: 'web'
}, userConf)

const rules = getRules(options)
const plugins = getPlugins(options)
const devWebpackConfig = merge(baseWebpackConf, {
  entry: path.resolve(__dirname, '../src/', 'app.mpx'),
  mode: 'development',
  module: {
    rules
  },
  plugins
})

module.exports = devWebpackConfig
