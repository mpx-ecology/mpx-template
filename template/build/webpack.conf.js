const path = require('path')
const MpxWebpackPlugin = require('@mpxjs/webpack-plugin')
{% if transWeb %}
const HtmlWebpackPlugin = require('html-webpack-plugin')
{% endif %}

const mainSubDir = '{% if isPlugin %}miniprogram{% endif %}'
function resolveSrc (file) {
  return path.resolve(__dirname, '../src', mainSubDir, file || '')
}

function resolve (dir) {
  return path.join(__dirname, '..', dir)
}

const webpackConf = {
  entry: {
    app: resolveSrc('app.mpx')
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
  },
  {% if transWeb %}
  optimization: {
    usedExports: true,
    sideEffects: true,
    providedExports: true
  },
  plugins: [
    new HtmlWebpackPlugin({
      filename: 'index.html',
      template: resolveSrc('index.html'),
      inject: true
    })
  ],
  {% endif %}
  performance: {
    hints: false
  },
  mode: 'none',
  resolve: {
    extensions: ['.js', '.mpx'{% if transWeb %}, '.vue'{% endif %}{% if tsSupport %}, '.ts'{% endif %}],
    modules: ['node_modules']
  }
}

module.exports = webpackConf
