const realMeta = require('./realMeta')

module.exports = {
  mock: {
    mode: 'wx',
    cross: true,
    transWeb: true,
    isPlugin: false,
    needEslint: true,
    babel7Support: true,
    needUnitTest: true
  },
  ...realMeta,
}
