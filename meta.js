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
      choices: ['wx', 'ali', 'swan', 'qq', 'tt'],
      default: 'wx'
    },
    cross: {
      when: 'srcMode === "wx"',
      message: '是否需要跨小程序平台',
      type: 'confirm',
      default: true
    },
    openChildProcess: {
      when: 'cross === true',
      message: '是否需要开启子进程进行编译',
      type: 'confirm',
      default: false
    },
    transWeb: {
      when: 'srcMode === "wx" && cross === true',
      message: '是否需要支持输出web',
      type: 'confirm',
      default: true
    },
    cloudFunc: {
      when: 'srcMode === "wx" && cross === false',
      message: '是否需要使用小程序云开发能力',
      type: 'confirm',
      default: false
    },
    isPlugin: {
      when: 'srcMode === "wx" && cross === false',
      type: 'confirm',
      message: '是否是个插件项目?（不清楚请选 No ！什么是插件项目请看微信官方文档！）',
      default: false
    },
    tsSupport: {
      message: '是否需要使用TS？',
      type: 'confirm',
      default: false
    },
    babel7Support: {
      message: '是否需要使用Babel7？',
      type: 'confirm',
      default: true
    },
    needEslint: {
      type: 'confirm',
      message: '是否需要ESlint',
      default: true
    },
    needDll: {
      type: 'confirm',
      message: '是否需要配置Dll',
      default: false
    },
    needUnitTest: {
      type: 'confirm',
      message: '是否需要单元测试',
      default: false
    },
    appid: {
      when: 'srcMode === "wx"',
      required: true,
      message: '请输入小程序的Appid',
      default: 'touristappid'
    }
  },
  computed: {
    dirFor () {
      switch (this.srcMode) {
        case 'wx':
          return 'wx:for'
        case 'ali':
          return 'a:for'
        case 'swan':
          return 's-for'
        case 'qq':
          return 'qq:for'
        case 'tt':
          return 'tt:for'
      }
    },
    dirKey () {
      switch (this.srcMode) {
        case 'wx':
          return 'wx:key'
        case 'ali':
          return 'a:key'
        case 'swan':
          return 's-key'
        case 'qq':
          return 'qq:key'
        case 'tt':
          return 'tt:key'
      }
    }
  },
  filters: {
    'src/@(miniprogram)/**/*': 'isPlugin || cloudFunc',
    'src/@(plugin)/**/*': 'isPlugin',
    'src/@(functions)/**/*': 'cloudFunc',
    'build/webpack.plugin.conf.js': 'isPlugin',
    'src/index.html': 'transWeb',
    'src/!(miniprogram|plugin)/**/*': 'srcMode !== "wx" || !isPlugin',
    'src/!(miniprogram|functions)/**/*': 'srcMode !== "wx" || !cloudFunc',
    'src/*': 'srcMode !== "wx" || (!isPlugin && !cloudFunc)',
    'static/wx/*': 'srcMode === "wx"',
    'static/!(wx)/*': 'cross',
    'tsconfig.json': 'tsSupport',
    '**/*.ts': 'tsSupport',
    '.babelrc': '!babel7Support',
    'babel.config.json': 'babel7Support',
    'test/**/*': 'needUnitTest',
    'jest.config.js': 'needUnitTest',
    'functions/*': 'cloudFunc',
    'build/buildDll.js': 'needDll',
    'config/dll.conf.js': 'needDll',
    'build/getDllEntries.js': 'needDll',
    'build/getDllManifests.js': 'needDll',
    'src/lib/dll.js': 'needDll',
    '.eslintrc.js': 'needEslint'
  },
  complete: function (data, { chalk }) {
    const green = chalk.green
    console.log(green('complete!'))
  },
  getMockData: function (mockList) {
    if (!mockList) return
    const mockData = {
      mode: 'wx',
      cross: false,
      transWeb: false,
      cloudFunc: false,
      isPlugin: false,
      needEslint: true,
      babel7Support: true,
      needUnitTest: false,
      needDll: false,
      tsSupport: false
    }
    if (mockList.length) {
      mockList.forEach((item) => {
        if (mockData.hasOwnProperty(item) && item !== 'mode') {
          mockData[item] = true
        }
      })
    }
    return mockData
  }
}
