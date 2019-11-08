const realMeta = require('./realMeta')

module.exports = {
  mock: {
    mode: 'wx',
    cross: false,
    isPlugin: true,
    needEslint: true
  },
  ...realMeta
}
