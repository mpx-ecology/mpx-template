const path = require('path');

const PluginReport = require('@mpxjs/e2e/report-server/server.js');
module.exports = {
  recordsDir: 'dist/wx/minitest', // 录制 json 文件的存储目录
  connectFirst: false, // 优先使用 automator.connect，默认 automator.launch 优先
  defaultWaitFor: 5000, // 默认 waitFor 时长
  devServer: {
    open: true
  },
  jestTimeout: 990000, // jestTimeout
  jsonCaseCpDir: 'test/e2e/e2e-json', // 从 minitest 目录复制 json 文件到该目录下
  needRealMachine: false, // 是否需要真机
  plugins: [new PluginReport()],
  projectPath: path.resolve(__dirname, './dist/wx'),
  sequence: [
    // 'minitest-1'
  ],
  reportsDir: 'test/e2e',
  testSuitsDir: 'test/e2e/',
  record: false,
  useTS: false,
  wsEndpoint: 'ws://localhost:9420', // automator.connect 的 wsEndpoint
  // timeoutSave: 3000, // 定时截图默认开启，设置为false即可关闭
  // cacheDirectory: path.resolve(__dirname, './node_modules/@mpxjs/e2e/report-server/cache'), // 配置截图数据的保存目录
  // tapSave: true, // 点击截图默认开启，设置为false即可关闭
  // routeUpdateSave: true, // 路由切换截图默认开启，设置为false即可关闭
  // watchResponse: [ { url: '/api/list', handler (res) {}} ], // 配置接口请求截图
}
