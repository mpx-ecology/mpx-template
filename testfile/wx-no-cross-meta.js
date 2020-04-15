const realMeta = require('./realMeta')

module.exports = {
  mock: {
    mode: 'wx',
    cross: false,
    isPlugin: false,
    needEslint: true,
    // babel7Support: false,
  },
  ...realMeta
}
