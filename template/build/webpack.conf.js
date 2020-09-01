const config = require('../config/index')
const MpxWebpackPlugin = require('@mpxjs/webpack-plugin')

const resolveSrc = config.resolveSrc
const resolve = config.resolve
const basicConf = config.basicConf

const eslintRule = {
  test: /\.(js|ts|mpx)$/,
  loader: 'eslint-loader',
  enforce: 'pre',
  include: [resolve('src')],
  options: {
    formatter: require('eslint-friendly-formatter')
  }
}

const tsRule = {
  test: /\.ts$/,
  use: [
    'babel-loader',
    'ts-loader'
  ]
}

const rules = [
  {
    test: /\.js$/,
    loader: 'babel-loader',
    include: [resolve('src'), resolve('test'), resolve('node_modules/@mpxjs')]
  },
  {
    test: /\.json$/,
    resourceQuery: /__component/,
    type: 'javascript/auto'
  },
  {
    test: /\.(wxs|qs|sjs|filter\.js)$/,
    loader: MpxWebpackPlugin.wxsPreLoader(),
    enforce: 'pre'
  },
  {
    test: /\.(png|jpe?g|gif|svg)$/,
    loader: MpxWebpackPlugin.urlLoader({
      name: 'img/[name][hash].[ext]'
    })
  }
]

if (basicConf.tsSupport) {
  rules.unshift(tsRule)
}

if (basicConf.needEslint) {
  rules.unshift(eslintRule)
}

const webpackConf = {
  entry: {
    app: resolveSrc('app.mpx')
  },
  module: { rules },
  performance: {
    hints: false
  },
  mode: 'none',
  resolve: {
    extensions: ['.mpx', '.js', '.wxml', '.vue', '.ts'],
    modules: ['node_modules']
  }
}

module.exports = webpackConf
