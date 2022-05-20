module.exports = {
  sequence: [ // spec 文件顺序
    // 'preTest',
    'list',
  ],
  reportsDir: 'test/reports', // 测试报告存放文件夹
  testSuitsDir: 'test/e2e/', // spec 文件存放目录
  record: true // 是否需要记录运行时间日志，为 true 时会在项目目录中创建 e2e-record.txt 文件
}
