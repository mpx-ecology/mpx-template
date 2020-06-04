const path = require('path')

const mainSubDir = ''

function resolveSrc (file) {
  return path.resolve(__dirname, '../src', mainSubDir, file || '')
}

function resolveDll (file) {
  return path.resolve(__dirname, '../dll', file || '')
}

module.exports = {
  cacheGroups: [
    {
      entries: [],
      // name: 'dll-test',
      // modes: ['wx', 'ali'],
      // root: 'subpackageA'
    }
  ],
  context: resolveSrc(),
  path: resolveDll(),
  webpackCfg: {
    mode: 'none'
  }
}
