const path = require('path')
const config = require('../config')
const context = config.context

module.exports = [
  {
    cacheGroups: [
      {
        entries: [path.join(context, 'lib/dll')],
        name: 'dll',
      }
    ],
    webpackCfg: {
      mode: 'none'
    }
  }
]


