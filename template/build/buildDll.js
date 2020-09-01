const webpack = require('webpack')
const path = require('path')
const ora = require('ora')
const rm = require('rimraf')
const chalk = require('chalk')
const merge = require('webpack-merge')
const getDllEntries = require('./getDllEntries')
const dllConfigs = normalizeArr(require('./dll.config'))
const config = require('../config/index')

function normalizeArr (arrCfg) {
  if (Array.isArray(arrCfg) && arrCfg.length) {
    return arrCfg
  } else if (arrCfg) {
    return [arrCfg]
  }
}

const dllName = '[name].[chunkHash].dll.js'
const manifestName = '[chunkHash].manifest.json'

const webpackCfgs = []

dllConfigs.forEach((dllConfig) => {
  const entries = getDllEntries(dllConfig.cacheGroups, dllConfig.modes)
  if (Object.keys(entries).length) {
    webpackCfgs.push(merge({
      entry: entries,
      output: {
        path: config.dllPath,
        filename: path.join('lib', dllName),
        libraryTarget: 'commonjs2'
      },
      mode: 'production',
      plugins: [
        new webpack.DllPlugin({
          path: path.join(config.dllPath, manifestName),
          name: dllName,
          format: dllConfig.format,
          entryOnly: dllConfig.entryOnly,
          type: 'commonjs2',
          context: config.context
        })
      ]
    }, dllConfig.webpackCfg))
  }
})

if (webpackCfgs.length) {
  const spinner = ora('Building dll...')
  spinner.start()

  rm.sync(config.dllPath)

  webpack(webpackCfgs.length === 1 ? webpackCfgs[0] : webpackCfgs, (err, stats) => {
    spinner.stop()
    if (err) return console.error(err)
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
      process.exit(1)
    }
    console.log(chalk.cyan('  Build dll complete.\n'))
  })

} else {
  console.log(chalk.yellow('  No valid dll entries found, check your [dll.config.js] file.\n'))
}
