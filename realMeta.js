module.exports = {
  prompts: {
    mode: {
      type: 'list',
      required: true,
      message: '请选择小程序项目所属平台（目前仅微信下支持跨平台输出）',
      choices: ['wx', 'ali', 'swan', 'qq', 'tt'],
      default: 'wx'
    },
    cross: {
      when: 'mode === "wx"',
      message: '是否需要跨小程序平台',
      type: 'confirm',
      default: true
    },
    transWeb: {
      when: 'mode === "wx" && cross === true',
      message: '是否需要支持输出web',
      type: 'confirm',
      default: (data) => {
        return data.cross
      }
    },
    cloudFunc: {
      when: 'mode === "wx" && cross === false',
      message: '是否需要使用小程序云开发能力',
      type: 'confirm',
      default: false
    },
    tsSupport: {
      message: '是否需要使用TS？',
      type: 'confirm',
      default: false
    },
    // babel7Support:{
    //   message: '是否需要使用Babel7？',
    //   type: 'confirm',
    //   default: false
    // },
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
    isPlugin: {
      when: 'mode === "wx" && cross === false && cloudFunc === false',
      type: 'confirm',
      message: '是否是个插件项目?（不清楚请选 No ！什么是插件项目请看微信官方文档！）',
      default: false
    },
    appid: {
      when: 'mode === "wx"',
      required: true,
      message: '请输入小程序的Appid',
      default: 'touristappid'
    },
    needEslint: {
      type: 'confirm',
      message: '是否需要ESlint',
      default: true
    }
  },
  computed: {
    dirFor () {
      switch (this.mode) {
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
      switch (this.mode) {
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
    'src/@(miniprogram|plugin)/**/*': 'isPlugin',
    'build/webpack.plugin.conf.js': 'isPlugin',
    'src/index.html': 'transWeb',
    'src/!(miniprogram|plugin)/**/*': 'mode !== "wx" || !isPlugin',
    'src/*': 'mode !== "wx" || !isPlugin',
    'project.config.json': 'mode === "wx" && !cross',
    'static/**/*': 'cross',
    'tsconfig.json': 'tsSupport',
    '.eslintrc.js': 'needEslint',
    '**/*.ts': 'tsSupport',
    '.babelrc': true,
    'babel.config.json': false,
    'functions/*': 'cloudFunc'
  },
  complete: function (data, { chalk }) {
    const green = chalk.green
    console.log(green('complete!'))
  }
}
