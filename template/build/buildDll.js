const webpack = require('webpack')
const path = require('path')
const rm = require('rimraf')
const chalk = require('chalk')
const { merge } = require('webpack-merge')
const getDllEntries = require('./getDllEntries')
const { dllConf } = require('../config/index')
const { normalizeArr } = require('./utils')

const dllName = '[name].[chunkHash].dll.js'
const manifestName = '[chunkHash].manifest.json'

const webpackCfgs = []

normalizeArr(dllConf.groups).forEach((item) => {
  const entries = getDllEntries(item.cacheGroups, item.modes)
  if (Object.keys(entries).length) {
    webpackCfgs.push(merge({
      entry: entries,
      output: {
        path: dllConf.path,
        filename: path.join('lib', dllName),
        libraryTarget: 'commonjs2'
      },
      mode: 'production',
      plugins: [
        new webpack.DllPlugin({
          path: path.join(dllConf.path, manifestName),
          name: dllName,
          format: item.format,
          entryOnly: item.entryOnly,
          type: 'commonjs2',
          context: dllConf.context
        }),
        new webpack.ProgressPlugin()
      ]
    }, item.webpackCfg))
  }
})

if (webpackCfgs.length) {
  rm.sync(dllConf.path)
  webpack(webpackCfgs.length === 1 ? webpackCfgs[0] : webpackCfgs, (err, stats) => {
    if (err) {
      process.exitCode = 1
      return console.error(err)
    }
    if (Array.isArray(stats.stats)) {
      stats.stats.forEach(item => {
        process.stdout.write(item.toString({
          colors: true,
          modules: false,
          children: false,
          chunks: false,
          chunkModules: false,
          entrypoints: false
        }) + '\n\n')
      })
    } else {
      process.stdout.write(stats.toString({
        colors: true,
        modules: false,
        children: false,
        chunks: false,
        chunkModules: false,
        entrypoints: false
      }) + '\n\n')
    }

    if (stats.hasErrors()) {
      console.log(chalk.red('  Build dll failed with errors.\n'))
    } else {
      console.log(chalk.cyan('  Build dll complete.\n'))
    }
  })
} else {
  console.log(chalk.yellow('  No valid dll entries found, check your [dll.config.js] file.\n'))
}
