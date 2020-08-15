const path = require('path')
const MpxWebpackPlugin = require('@mpxjs/webpack-plugin')

const pluginSubDir = 'plugin'

function resolve (dir) {
  return path.join(__dirname, '..', dir)
}

function resolveSrc (file) {
  return path.resolve(__dirname, '../src', pluginSubDir, file || '')
}

function resolveDist (file) {
  return path.resolve(__dirname, '../dist/wx', pluginSubDir, file || '')
}

const pluginConfig = {
  name: 'plugin-compile',
  // entry point of our application
  entry: {
    plugin: resolveSrc('plugin.json')
  },
  output: {
    path: resolveDist()
  },
  module: {
    rules: [
      {% if needEslint %}
      {
        test: /\.(js{% if tsSupport %}|ts{% endif %}|mpx)$/,
        loader: 'eslint-loader',
        enforce: 'pre',
        include: [resolve('src')],
        options: {
          formatter: require('eslint-friendly-formatter')
        }
      },
      {% endif %}{% if tsSupport %}
      {
        test: /\.ts$/,
        use: [
          'babel-loader',
          'ts-loader'
        ]
      },
      {% endif %}
      {
        test: /\.js$/,
        loader: 'babel-loader',
        include: [resolve('src'), resolve('test'), resolve('node_modules/@mpxjs')],
        exclude: [resolve('node_modules/@mpxjs/webpack-plugin')]
      },
      {
        test: /\.json$/,
        resourceQuery: /__component/,
        type: 'javascript/auto'
      },
      {
        resource: resolveSrc('plugin.json'),
        use: MpxWebpackPlugin.pluginLoader()
      },
      {
        test: /\.mpx$/,
        use: MpxWebpackPlugin.loader()
      }
    ]
  },
  plugins: [
    new MpxWebpackPlugin({
      mode: '<$ mode $>',
      transRpxRules: {
        mode: 'only',
        comment: 'use rpx',
        include: resolveSrc()
      }
    })
  ],
  performance: {
    hints: false
  },
  mode: 'none',
  resolve: {
    extensions: ['.js', '.mpx'],
    modules: ['node_modules']
  }
}

module.exports = pluginConfig
