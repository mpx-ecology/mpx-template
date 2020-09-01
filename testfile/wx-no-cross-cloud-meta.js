const realMeta = require('./realMeta')

module.exports = {
  mock: {
    mode: 'wx',
    cross: false,
    transWeb: false,
    isPlugin: false,
    cloudFunc: true,
    needEslint: true,
    babel7Support: false,
    needUnitTest: false,
    needDll: true,
    tsSupport: false
  },
  ...realMeta
}
