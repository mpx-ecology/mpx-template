const realMeta = require('./realMeta')

module.exports = {
  mock: {
    mode: 'wx',
    cross: false,
    transWeb: false,
    isPlugin: false,
    needEslint: false,
    babel7Support: false,
    needUnitTest: false,
    needDll: false,
    tsSupport: false,
    cloudFunc: false
  },
  ...realMeta
}
