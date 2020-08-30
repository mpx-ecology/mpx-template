const realMeta = require('./realMeta')

module.exports = {
  mock: {
    mode: 'wx',
    cross: true,
    transWeb: false,
    isPlugin: false,
    cloudFunc: false,
    needEslint: true,
    babel7Support: true,
    needUnitTest: true
  },
  ...realMeta
}
