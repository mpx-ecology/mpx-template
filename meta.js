module.exports = {
  prompts: {
    name: {
      type: 'string',
      required: true,
      message: '项目名称'
    },
    description: {
      type: 'string',
      required: false,
      message: '项目描述',
      default: 'A mpx project'
    },
    author: {
      type: 'string',
      message: '作者'
    },
    srcMode: {
      type: 'list',
      required: true,
      message: '请选择小程序项目所属平台（目前仅微信下支持跨平台输出）',
      choices: ['wx', 'ali', 'swan', 'qq', 'tt', 'qa', 'jd', 'dd'],
      default: 'wx'
    },
    cross: {
      when: 'srcMode === "wx"',
      message: '是否需要跨小程序平台',
      type: 'confirm',
      default: (data) => {
        return data.srcMode === 'wx'
      }
    },
    openChildProcess: {
      when: 'cross',
      message: '是否需要开启子进程进行编译',
      type: 'confirm',
      default: false
    },
    transWeb: {
      when: 'cross',
      message: '是否需要支持输出web',
      type: 'confirm',
      default: (data) => {
        return data.cross
      }
    },
    isPlugin: {
      when: 'srcMode === "ali" || srcMode === "wx"',
      type: 'confirm',
      message: '是否是个插件项目?（不清楚请选 No ！什么是插件项目请看微信或支付宝官方文档！）',
      default: false
    },
    functional: {
      when: 'srcMode === "wx" && !cross && !isPlugin',
      message: '是否需要提供插件功能页',
      type: 'confirm',
      default: false
    },
    cloudFunc: {
      when: 'srcMode === "wx" && !cross && !isPlugin',
      message: '是否需要使用小程序云开发能力',
      type: 'confirm',
      default: false
    },
    tsSupport: {
      message: '是否需要使用TS？',
      type: 'confirm',
      default: false
    },
    needEslint: {
      type: 'confirm',
      message: '是否需要ESlint',
      default: true
    },
    needUnitTest: {
      type: 'confirm',
      message: '是否需要单元测试',
      default: false
    },
    needE2eTest: {
      when: 'srcMode === "wx"',
      type: 'confirm',
      message: '是否需要E2E测试',
      default: false
    },
    appid: {
      type: 'string',
      message: '请输入小程序的Appid',
      default: ''
    }
  },
  computed: {
    dirFor () {
      switch (this.srcMode) {
        case 'ali':
          return 'a:for'
        case 'swan':
          return 's-for'
        default:
          return `${this.srcMode}:for`
      }
    },
    dirKey () {
      switch (this.srcMode) {
        case 'ali':
          return 'a:key'
        case 'swan':
          return 's-key'
        default:
          return `${this.srcMode}:key`
      }
    }
  },
  filters: {
    'src/@(miniprogram|plugin)/**/*': 'isPlugin',
    'src/functions/**/*': 'cloudFunc',
    'src/functional-pages/**/*': 'functional',
    'src/index.html': 'transWeb',
    'src/!(miniprogram|plugin)/**/*': '!isPlugin',
    'src/*': '!isPlugin',
    'static/wx/*': 'srcMode === "wx"',
    'static/ali/*': 'srcMode === "ali" || cross',
    'static/tt/*': 'srcMode === "tt" || cross',
    'static/swan/*': 'srcMode === "swan" || cross',
    'tsconfig.json': 'tsSupport',
    '**/*.ts': 'tsSupport',
    'test/unit/**/*': 'needUnitTest',
    'test/setup.js': 'needUnitTest',
    'jest.config.js': 'needUnitTest',
    '.eslintrc.js': 'needEslint',
    'test/e2e/components/list.spec.js': 'needE2eTest && !tsSupport',
    'test/e2e/components/list.spec.ts': 'needE2eTest && tsSupport',
    'test/e2e/screenshot/*': 'needE2eTest',
    'jest-e2e.config.js': 'needE2eTest',
    '.e2erc.js': 'needE2eTest'
  },
  complete: function (data, { chalk }) {
    const green = chalk.green
    console.log(green('complete!'))
  },
  getMockData: function (mockList) {
    if (!mockList) return
    const mockData = {
      srcMode: 'wx',
      cross: false,
      transWeb: false,
      cloudFunc: false,
      functional: false,
      isPlugin: false,
      needEslint: true,
      needUnitTest: false,
      tsSupport: false
    }
    if (mockList.length) {
      mockList.forEach((item) => {
        const [key, value] = item.split('=')
        mockData[key] = value || true
      })
    }
    return mockData
  }
}
