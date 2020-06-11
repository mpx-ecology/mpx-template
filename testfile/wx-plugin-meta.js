const realMeta = require('./realMeta')

module.exports = {
  mock: {
    mode: 'wx',
    cross: false,
    isPlugin: true,
    needEslint: true,
    babel7Support: false,
    needUnitTest: false
  },
  ...realMeta
}
