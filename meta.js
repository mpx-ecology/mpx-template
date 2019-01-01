module.exports = {
  prompts: {
    mode: {
      type: 'list',
      required: true,
      message: 'Project mode',
      choices: ['wx', 'ali'],
      default: 'wx'
    },
    name: {
      type: 'string',
      required: true,
      message: 'Project name'
    },
    description: {
      type: 'string',
      required: false,
      message: 'Project description',
      default: 'A mpx project'
    },
    author: {
      type: 'string',
      message: 'Author'
    },
    isPlugin: {
      when: 'mode === "wx"',
      type: 'confirm',
      message: 'Is this a plugin project?',
      default: false
    },
    appid: {
      when: 'mode === "wx"',
      required: true,
      message: 'Appid',
      default: 'touristappid'
    },
    needEslint: {
      default: true
    }
  },
  filters: {
    'src/@(miniprogram|plugin)/**/*': 'mode === "wx" && isPlugin',
    'build/webpack.plugin.conf.js': 'mode === "wx" && isPlugin',
    'src/!(miniprogram|plugin)/**/*': 'mode !== "wx" || !isPlugin',
    'src/*': 'mode !== "wx" || !isPlugin',
    'project.config.json': 'mode === "wx"',
    '.eslintrc.js': 'needEslint'
  },
  complete: function (data, {chalk}) {
    const green = chalk.green
    console.log(green('complete!'))
  }
}
