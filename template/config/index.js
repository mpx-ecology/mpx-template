const devEnv = require('./dev.env')
const prodEnv = require('./prod.env')
const path = require('path')

const mainSubDir = '{% if isPlugin %}miniprogram{% endif %}'

// mpx的loader配置在这里传入
// 配置项文档：https://www.mpxjs.cn/api/compile.html#mpxwebpackplugin-loader
const mpxLoaderConfig = {}

// 根据创建项目时的问题生成的
// 改动需谨慎，有的选项存在互斥关系，比如跨平台开发，就不能开发插件
// 若需修改以启用新的能力，建议试试新建项目按问题生成模板后把这部分内容拷贝过来
const basicConf = {
  mode: '{{ mode }}',
  cross: '{{ cross }}',
  transWeb: '{{ transWeb }}',
  cloudFunc: '{{ cloudFunc }}',
  isPlugin: '{{ isPlugin }}',
  tsSupport: '{{ tsSupport }}',
  babel7Support: '{{ babel7Support }}',
  needEslint: '{{ needEslint }}',
  needDll: '{{ needDll }}',
  needUnitTest: '{{ needUnitTest }}'
}

function resolveSrc (file) {
  return path.resolve(__dirname, '../src', mainSubDir, file || '')
}

function resolve (file) {
  return path.resolve(__dirname, '..', file || '')
}

module.exports = function getConfig (isProduction) {
  return {
    ...basicConf,
    mpxLoaderConfig,
    context: resolveSrc(),
    dllPath: resolve('dll'),
    env: isProduction ? prodEnv : devEnv,
    supportedModes:['wx', 'ali', 'swan', 'qq', 'tt', 'web']
  }
}
