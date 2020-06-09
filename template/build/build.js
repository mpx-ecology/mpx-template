const ora = require('ora')
const rm = require('rimraf')
const path = require('path')
const chalk = require('chalk')
const webpack = require('webpack')
const merge = require('webpack-merge')
const program = require('commander')
{% if transWeb %}
const HtmlWebpackPlugin = require('html-webpack-plugin')
{% endif %}
const CopyWebpackPlugin = require('copy-webpack-plugin')
const MpxWebpackPlugin = require('@mpxjs/webpack-plugin')
const mpxWebpackPluginConfig = require('./mpx.plugin.conf')
const getConfig = require('../config/index')
{% if needDll %}
const getDllManifests = require('./getDllManifests')
{% endif %}

let webpackMainConfig = require('./webpack.conf')

const mainSubDir = '{% if isPlugin %}miniprogram{% elif cloudFunc %}miniprogram{% endif %}'
function resolveDist (file, subPathStr = mainSubDir) {
  return path.resolve(__dirname, '../dist', subPathStr, file || '')
}
function resolve (file) {
  return path.resolve(__dirname, '..', file || '')
}

const webpackConfigArr = []
const userSelectedMode = '<$ mode $>'

const mpxLoaderConfig = {}

{% if transWeb %}
 const transWebModuleRules = [
  {
    test: /\.vue$/,
    loader: 'vue-loader'
  },
  {
    test: /\.mpx$/,
    use: [
      {
        loader: 'vue-loader',
        options: {
          transformToRequire: {
            'mpx-image': 'src',
            'mpx-audio': 'src',
            'mpx-video': 'src'
          }
        }
      },
      MpxWebpackPlugin.loader(mpxLoaderConfig)
    ]
  },
  {
    test: /\.styl$/,
    use: [
      'style-loader',
      'css-loader',
      'stylus-loader'
    ]
  }
]
{% endif %}
const transModuleRules = [
  {
    test: /\.mpx$/,
    use: MpxWebpackPlugin.loader(mpxLoaderConfig)
  }
]

program
  .option('-w, --watch', 'watch mode')
  .option('-p, --production', 'production release')
  .parse(process.argv)

const config = getConfig(program.production)
{% if needDll %}
const dllManifests = getDllManifests(program.production)
{% endif %}

{% if mode === 'wx' and not cross %}
const plugins = []
const copyList = [
  {
    from: resolve('project.config.json'),
    to: mainSubDir ? '..' : ''
  }{% if cloudFunc %},
  {
    context: resolve(`functions`),
    from: '**/*',
    to: 'functions/'
  }{% endif %}
]
{% if needDll %}
const localDllManifests = dllManifests.filter((manifest) => {
  return !manifest.mode
})
localDllManifests.forEach((manifest) => {
  plugins.push(new webpack.DllReferencePlugin({
    context: config.context,
    manifest: manifest.content
  }))
  copyList.push({
    context: path.join(config.dllPath, 'lib'),
    from: manifest.content.name,
    to: manifest.content.name
  })
})
{% endif %}
plugins.push(new CopyWebpackPlugin(copyList))

const webpackWxConfig = merge(webpackMainConfig, {
  plugins
})
{% endif %}

{% if isPlugin %}
webpackConfigArr.push(require('./webpack.plugin.conf'))

webpackConfigArr.push(merge(userSelectedMode === 'wx' ? webpackWxConfig : webpackMainConfig, {
  name: 'main-compiler',
  output: {
    path: resolveDist()
  },
  module: { rules: transModuleRules },
  plugins: [
    new MpxWebpackPlugin(Object.assign({mode: userSelectedMode}, mpxWebpackPluginConfig))
  ]
}))

{% elif not cross %}
webpackConfigArr.push(merge({% if mode === 'wx' %}webpackWxConfig{% else %}webpackMainConfig{% endif %}, {
  output: {
    path: resolveDist()
  },
  module: { rules: transModuleRules },
  plugins: [
    new MpxWebpackPlugin(Object.assign({mode: userSelectedMode}, mpxWebpackPluginConfig))
  ]
}))
{% else %}
// 支持的平台，若后续@mpxjs/webpack-plugin支持了更多平台，补充在此即可
const supportedCrossMode = config.supportedModes
// 提供npm argv找到期望构建的平台，必须在上面支持的平台列表里
const npmConfigArgvOriginal = (process.env.npm_config_argv && JSON.parse(process.env.npm_config_argv).original) || []
const modeArr = npmConfigArgvOriginal.filter(item => typeof item === 'string').map(item => item.replace('--', '')).filter(item => supportedCrossMode.includes(item))

if (modeArr.length === 0) modeArr.push(userSelectedMode)

modeArr.forEach(item => {
  const plugins = [
    new MpxWebpackPlugin(Object.assign({
      mode: item,
      srcMode: userSelectedMode
    }, mpxWebpackPluginConfig))
  ]
  const copyList = [{
    context: resolve(`static/${item}`),
    from: '**/*',
    to: mainSubDir ? '..' : ''
  }]
  {% if needDll %}
  const localDllManifests = dllManifests.filter((manifest) => {
    return manifest.mode === item || !manifest.mode
  })

  localDllManifests.forEach((manifest) => {
    plugins.push(new webpack.DllReferencePlugin({
      context: config.context,
      manifest: manifest.content
    }))
    copyList.push({
      context: path.join(config.dllPath, 'lib'),
      from: manifest.content.name,
      to: manifest.content.name
    })
  })
  {% endif %}
  plugins.push(new CopyWebpackPlugin(copyList))

  const webpackCrossConfig = merge(webpackMainConfig, {
    name: item + '-compiler',
    output: {
      path: resolveDist('', item)
    },
    module: { rules: {% if transWeb %}item === 'web' ? transWebModuleRules : transModuleRules{% else %}transModuleRules{% endif %} },
    plugins
  }{% if transWeb %}, item === 'web' ? {
    optimization: {
      usedExports: true,
      sideEffects: true,
      providedExports: true
    },
    plugins: [
      new HtmlWebpackPlugin({
        filename: 'index.html',
        template: resolve('src/index.html'),
        inject: true
      })
    ]
  } : undefined{% endif %})
  webpackConfigArr.push(webpackCrossConfig)
})
{% endif %}

function runWebpack (cfg) {
  // env
  if (Array.isArray(cfg)) {
    cfg.forEach(item => item.plugins.unshift(new webpack.DefinePlugin(config.env)))
  } else {
    cfg.plugins.unshift(new webpack.DefinePlugin(config.env))
  }

  // production mode set mode be 'production' for webpack
  // watch mode set cache be true for webpack
  if (program.production || program.watch) {
    const extendCfg = {}
    if (program.production) { extendCfg.mode = 'production' }
    if (program.watch){ extendCfg.cache = true }

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

  if (!program.watch && stats.hasErrors()) {
    console.log(chalk.red('  Build failed with errors.\n'))
    process.exit(1)
  }

  console.log(chalk.cyan('  Build complete.\n'))
  if (program.watch) {
    console.log(chalk.cyan(`  ${new Date()} build finished.\n  Still watching...\n`))
  }
}

var spinner = ora('building...')
spinner.start()

try {
  {% if cross %}
  modeArr.forEach(item => {
    rm.sync(path.resolve(__dirname, `../dist/${item}/*`))
  })
  {% else %}
  rm.sync(path.resolve(__dirname, `../dist/*`))
  {% endif %}
} catch (e) {
  console.error(e)
  console.log('\n\n删除dist文件夹遇到了一些问题，如果遇到问题请手工删除dist重来\n\n')
}

if (webpackConfigArr.length === 1) {
  runWebpack(webpackConfigArr[0])
} else {
  runWebpack(webpackConfigArr)
}
