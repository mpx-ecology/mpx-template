const realMeta = require('./realMeta')

module.exports = {
  mock: {
    mode: 'wx',
    cross: false,
    cloudFunc: false,
    isPlugin: false,
    needEslint: true,
    babel7Support: false,
    needUnitTest: false
  },
  ...realMeta
}
