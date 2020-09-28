const devEnv = require('./dev.env')
const prodEnv = require('./prod.env')
const path = require('path')

// mpx的loader配置在这里传入
// 配置项文档：https://www.mpxjs.cn/api/compile.html#mpxwebpackplugin-loader
const mpxLoaderConfig = {}

// 根据创建项目时的问题生成的
// 改动需谨慎，有的选项存在互斥关系，比如跨平台开发，就不能开发插件
// 若需修改以启用新的能力，建议试试新建项目按问题生成模板后把这部分内容拷贝过来
const basicConf = {
  mode: formatOption('<$ mode $>'),
  cross: formatOption('<$ cross $>'),
  transWeb: formatOption('<$ transWeb $>'),
  cloudFunc: formatOption('<$ cloudFunc $>'),
  isPlugin: formatOption('<$ isPlugin $>'),
  tsSupport: formatOption('<$ tsSupport $>'),
  babel7Support: formatOption('<$ babel7Support $>'),
  needEslint: formatOption('<$ needEslint $>'),
  needDll: formatOption('<$ needDll $>'),
  needUnitTest: formatOption('<$ needUnitTest $>')
}

// 小程序主入口所在目录，插件模式和云开发会在src/miniprogram下面
const mainSubDir = (basicConf.isPlugin || basicConf.cloudFunc) ? 'miniprogram' : ''

function resolveSrc (file) {
  return path.resolve(__dirname, '../src', mainSubDir, file || '')
}

function resolveDist (platform, subPathStr = mainSubDir) {
  return path.resolve(__dirname, '../dist', platform, subPathStr, '')
}

function resolve (file) {
  return path.resolve(__dirname, '..', file || '')
}

function formatOption (option) {
  if (option === 'true') return true
  if (option === 'false') return false
  return option
}

module.exports = {
  basicConf,
  mainSubDir,
  mpxLoaderConfig,
  context: resolveSrc(),
  resolveSrc,
  resolveDist,
  resolve,
  dllPath: resolve('dll'),
  getEnv: (isProduction) => { return isProduction ? prodEnv : devEnv },
  supportedModes: ['wx', 'ali', 'swan', 'qq', 'tt', 'web']
}
