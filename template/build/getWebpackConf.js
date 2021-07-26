const webpackBaseConf = require('./webpack.base.conf')
const merge = require('webpack-merge')
const getRules = require('./getRules')
const getPlugins = require('./getPlugins')
const { resolveSrc, resolveDist } = require('./utils')

module.exports = function getWebpackConfs (options) {
  const { plugin, subDir, mode, production, watch } = options
  const entry = plugin ? {
    plugin: resolveSrc('plugin.json?isMpxPlugin', subDir)
  } : {
    app: resolveSrc('app.mpx', subDir)
  }
  const output = {
    path: resolveDist(mode, subDir)
  }
  const name = plugin ? 'plugin-compiler' : `${mode}-compiler`
  const rules = getRules(options)
  const plugins = getPlugins(options)
  const extendConfs = {}
  if (production) {
    extendConfs.mode = 'production'
  }
  extendConfs.optimization = {
    nodeEnv: production ? 'production' : 'development'
  }
  if (watch) {
    extendConfs.cache = true
    // 仅在watch模式下生产sourcemap
    // 百度小程序不开启sourcemap，开启会有模板渲染问题
    if (mode !== 'swan') {
      extendConfs.devtool = 'source-map'
    }
  }

  return merge(webpackBaseConf, {
    name,
    entry,
    output,
    module: {
      rules
    },
    plugins
  }, extendConfs)
}
