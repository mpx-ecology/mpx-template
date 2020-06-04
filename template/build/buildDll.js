const webpack = require('webpack')
const dllConfig = require('./dll.config')
const path = require('path')
const ora = require('ora')
const rm = require('rimraf')
const chalk = require('chalk')
const merge = require('webpack-merge')
const getDllEntries = require('./getDllEntries')


const entries = getDllEntries(dllConfig.cacheGroups)

if (Object.keys(entries).length) {
  const dllName = '[name].[hash].dll.js'
  const manifestName = '[hash].manifest.json'
  const webpackCfg = merge({
    entry: entries,
    output: {
      path: dllConfig.path,
      filename: path.join('lib', dllName),
      libraryTarget: 'commonjs2'
    },
    plugins: [
      new webpack.DllPlugin({
        path: path.join(dllConfig.path, manifestName),
        name: dllName,
        type: 'commonjs2',
        context: dllConfig.context
      })
    ]
  }, dllConfig.webpackCfg)

  const spinner = ora('Building dll...')
  spinner.start()

  rm.sync(dllConfig.path)

  webpack(webpackCfg, (err, stats) => {
    spinner.stop()
    if (err) return console.error(err)
    process.stdout.write(stats.toString({
      colors: true,
      modules: false,
      children: false,
      chunks: false,
      chunkModules: false,
      entrypoints: false
    }) + '\n\n')

    if (stats.hasErrors()) {
      console.log(chalk.red('  Build failed with errors.\n'))
      process.exit(1)
    }
    console.log(chalk.cyan('  Build complete.\n'))
  })
} else {
  console.log(chalk.yellow('  No valid dll entries found, check your [dll.config.js] file.\n'))
}
