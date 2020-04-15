const realMeta = require('./realMeta')

module.exports = {
  mock: {
    mode: 'wx',
    cross: true,
    transWeb: false,
    isPlugin: false,
    needEslint: true,
    // babel7Support: true,
  },
  ...realMeta,
}
