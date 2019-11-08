const commonMeta = require('../realMeta')

module.exports = {
  mock: {
    mode: 'wx',
    cross: true,
    isPlugin: false,
    needEslint: true
  },
  ...commonMeta
}
