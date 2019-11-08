const realMeta = require('./realMeta')

module.exports = {
  mock: {
    mode: 'wx',
    cross: true,
    isPlugin: false,
    needEslint: true
  },
  ...realMeta
}
