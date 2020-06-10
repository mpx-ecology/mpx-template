const path = require('path')
const getConfig = require('../config')
const context = getConfig(true).context

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


