const path = require('path')

// 可以在此配置mpx webpack plugin，会assign进build.js里new创建plugin的config里
module.exports = {
  // resolve的模式
  resolveMode: 'webpack', // 可选值 webpack / native，默认是webpack，原生迁移建议使用native

  // 当resolveMode为native时可通过该字段指定项目根目录
  // projectRoot: path.resolve(__dirname, '../src'),

  // 可选值 full / changed，不传默认为full，当设置为changed时在watch模式下将只会对内容发生变化的文件进行写入，以提升小程序开发者工具编译性能
  writeMode: 'changed'
}
