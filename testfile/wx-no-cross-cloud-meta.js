const realMeta = require('./realMeta')

module.exports = {
  mock: {
    mode: 'wx',
    cross: false,
    cloudFunc: true,
    isPlugin: false,
    needEslint: true,
    babel7Support: false,
    needUnitTest: false
  },
  ...realMeta
}
