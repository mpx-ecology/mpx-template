var path = require('path')
var merge = require('webpack-merge')
{% if mode === "wx" %}
var CopyWebpackPlugin = require('copy-webpack-plugin')
{% endif %}
var baseWebpackConfig = require('./webpack.base.conf')
var mainSubDir = '{% if isPlugin %}miniprogram{% endif %}'

function resolveSrc (file) {
  return path.resolve(__dirname, '../src', mainSubDir, file || '')
}

function resolveDist (file) {
  return path.resolve(__dirname, '../dist', mainSubDir, file || '')
}

module.exports = merge(baseWebpackConfig, {
  // entry point of our application
  entry: {
    app: resolveSrc('app.mpx')
  },
  output: {
    path: resolveDist()
  },
  {% if mode === "wx" %}
  plugins: [
    new CopyWebpackPlugin([
      {
        from: path.resolve(__dirname, '../static/project.config.json'),
        to: path.resolve(__dirname, '../dist/project.config.json')
      }
    ])
  ],
  {% endif %}
  resolve: {
    modules: [resolveSrc()]
  }
})