const ora = require('ora')
const rm = require('rimraf')
const path = require('path')
const chalk = require('chalk')
const webpack = require('webpack')
const merge = require('webpack-merge')
const program = require('commander')
const CopyWebpackPlugin = require('copy-webpack-plugin')
const MpxWebpackPlugin = require('@mpxjs/webpack-plugin')

let webpackMainConfig = require('./webpack.base.conf')
{% if mode === 'wx' %}
// 微信小程序需要拷贝project.config.json，如果npm script参数里有--wx，拷贝到/dist下，如果指定--wx，拷贝到/dist/wx下
const configOutputPath = process.env.npm_config_wx ? '../dist/wx/project.config.json' : '../dist/project.config.json'
const webpackWxConfig = merge(webpackMainConfig, {
  plugins: [
    new CopyWebpackPlugin([
      {
        from: path.resolve(__dirname, '../project.config.json'),
        to: path.resolve(__dirname, configOutputPath)
      }
    ])
  ]
})
{% endif %}

const mainSubDir = '{% if isPlugin %}miniprogram{% endif %}'
function resolveDist (file, path = mainSubDir) {
  return path.resolve(__dirname, '../dist', path, file || '')
}

const webpackConfigArr = []
let isPluginProject = false
const userSelectedMode = '<$ mode $>'
{% if isPlugin %}
isPluginProject = true
webpackConfigArr.push(require('./webpack.plugin.conf'))
{% endif %}

const supportedCrossMode = ['wx', 'ali', 'swan', 'qq', 'tt']
const npmConfigArgvOriginal = (process.env.npm_config_argv && JSON.parse(process.env.npm_config_argv).original) || []
const modeArr = npmConfigArgvOriginal.filter(item => typeof item === 'string').map(item => item.replace('--', '')).filter(item => supportedCrossMode.includes(item))

if (modeArr.length === 0) {
  webpackConfigArr.push(merge(userSelectedMode === 'wx' ? webpackWxConfig : webpackMainConfig, {
    output: {
      path: resolveDist()
    },
    plugins: [
      new MpxWebpackPlugin({mode: userSelectedMode})
    ]
  }))
} else {
  modeArr.forEach(item => {
    const webpackCrossConfig = merge(item === 'wx' ? webpackWxConfig : webpackMainConfig, {
      name: item + '-compiler',
      output: {
        path: resolveDist('', item)
      },
      plugins: [
        new MpxWebpackPlugin({
          mode: item,
          srcMode: '<$ mode $>'
        })
      ]
    })
    webpackConfigArr.push(webpackCrossConfig)
  })
}

var prodEnv = require('../config/prod.env')
var devEnv = require('../config/dev.env')

program
  .option('-w, --watch', 'watch mode')
  .option('-p, --production', 'production release')
  .parse(process.argv)

function runWebpack (cfg) {
  // env
  if (Array.isArray(cfg)) {
    cfg.forEach(item => item.plugins.unshift(new webpack.DefinePlugin(program.production ? prodEnv : devEnv)))
  } else {
    cfg.plugins.unshift(new webpack.DefinePlugin(program.production ? prodEnv : devEnv))
  }

  if (program.production || program.watch) {
    const extendCfg = program.production ? { mode: 'production' } : { cache: true }
    if (Array.isArray(cfg)) {
      cfg = cfg.map(item => merge(item, extendCfg))
    } else {
      cfg = merge(cfg, extendCfg)
    }
  }
  if (process.env.npm_config_report) {
    var BundleAnalyzerPlugin = require('webpack-bundle-analyzer').BundleAnalyzerPlugin
    var mainCfg = Array.isArray(cfg) ? cfg[0] : cfg
    mainCfg.plugins.push(new BundleAnalyzerPlugin())
  }
  if (program.watch) {
    webpack(cfg).watch({}, callback)
  } else {
    webpack(cfg, callback)
  }
}

function callback (err, stats) {
  spinner.stop()
  if (err) return console.error(err)
  if (Array.isArray(stats.stats)) {
    stats.stats.forEach(item => {
      console.log(item.compilation.name + '打包结果：')
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

  console.log(chalk.cyan('  Build complete.\n'))
  if (program.watch) {
    console.log(chalk.cyan('  Watching...\n'))
  }
}

var spinner = ora('building...')
spinner.start()

try {
  rm.sync(path.resolve(__dirname, '../dist/{*,.*}'))
} catch (e) {
  console.error(e)
  console.log('\n\n删除dist文件夹遇到了一些问题，如果遇到问题请手工删除dist重来\n\n')
}
if (webpackConfigArr.length === 1) {
  runWebpack(webpackConfigArr[0])
} else {
  runWebpack(webpackConfigArr)
}
