const path = require('path');
const PluginReport = require('@mpxjs/e2e/report-server/server.js');
module.exports = {
  recordsDir: 'dist/wx/minitest', // 录制 json 文件的存储目录
  connectFirst: false, // 优先使用 automator.connect，默认 automator.launch 优先
  defaultWaitFor: 5000, // 默认 waitFor 时长
  devServer: { // 测试报告服务器配置
    open: true,
    port: 8886
  },
  jestTimeout: 990000, // jestTimeout
  jsonCaseCpDir: 'test/e2e/e2e-json', // 从 minitest 目录复制 json 文件到该目录下
  needRealMachine: false, // 是否需要真机
  plugins: [new PluginReport()], // 自定义测试报告的插件
  projectPath: path.resolve(__dirname, './dist/wx'),
  sequence: [ // e2e 的 case 的执行顺序
    'list'
  ],
  testSuitsDir: 'test/e2e/components/', // e2e 的 case 存放目录
  {% if tsSupport %}
  useTS: true, // e2e 的 case 是否为 TS 语法
  {% endif %}
  wsEndpoint: 'ws://localhost:9420', // automator.connect 的 wsEndpoint
  timeoutSave: 3000, // 定时截图默认开启，设置为 false 即可关闭
  cacheDirectory: path.resolve(__dirname, './node_modules/@mpxjs/e2e/report-server/cache'), // 配置截图数据的保存目录
  tapSave: true, // 点击截图默认开启，设置为 false 即可关闭
  routeUpdateSave: true, // 路由切换截图默认开启，设置为 false 即可关闭
  routeTime: 300, // 路由切换 300ms 后再截图
  watchResponse: [ { url: '/api/list', handler (newRes, oldRes) { return true }} ], // 配置接口请求截图
}
