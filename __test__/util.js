/**
 * @file 公用测试方法
 */
const assert = require('assert')
const fs = require('fs')

/**
 * 检查项目的静态文件夹是否存在
 * @param {string} projectFolder 项目目录
 * @param {object=} options 配置项
 * @param {string} [options.mode=wx] 默认选择的平台
 * @param {boolean} [options.isCross=false] 是否跨平台
 */
const checkStatic = (projectFolder, options = {mode: 'wx', isCross: false}) => {
  const {mode = 'wx', isCross = false} = options

  if (mode === 'wx') {
    // check exist in static folder
    assert(!fs.existsSync(`${projectFolder}/static/wx`))
    assert(!fs.existsSync(`${projectFolder}/static/wx/project.config.json`))

    // check exist in dist folder
    assert(!fs.existsSync(`${projectFolder}/dist/wx`))
    assert(!fs.existsSync(`${projectFolder}/dist/wx/project.config.json`))

    if (isCross) {
      assert(!fs.existsSync(`${projectFolder}/static/ali`))
      assert(!fs.existsSync(`${projectFolder}/static/ali/mini.project.json`))

      assert(!fs.existsSync(`${projectFolder}/dist/ali`))
      assert(!fs.existsSync(`${projectFolder}/dist/ali/mini.project.json`))
    }
  } else {
    // todo
  }
}

module.exports = {
  checkStatic
}
