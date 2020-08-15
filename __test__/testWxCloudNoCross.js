const shell = require('shelljs')
const path = require('path')
const { checkStatic } = require('./util')
const assert = require('assert')
const fs = require('fs')

function resolve (dir) {
  return path.join(__dirname, '..', dir)
}

const projectFolder = resolve('demo-wx-no-cross-cloud')

shell.cp('testfile/wx-no-cross-cloud-meta.js', './meta.js').code !== 0 && shell.exit(1)
shell.exec(`mpx init ${projectFolder} --offline .`).code !== 0 && shell.exit(1)
shell.exec(`cd ${projectFolder} && npm i && npm run build`).code !== 0 && shell.exit(1)

checkStatic(projectFolder)

// dist里有miniprogram文件夹
assert(fs.existsSync(resolve(`${projectFolder}/dist/wx/miniprogram`)))

// dist里有functions文件夹
assert(fs.existsSync(resolve(`${projectFolder}/dist/wx/functions`)))

// 检查项目配置中对小程序路径和云函数路径是否正确
const projectConfig = require(resolve(`${projectFolder}/dist/wx/project.config.json`))
assert(projectConfig.miniprogramRoot === 'miniprogram')
assert(projectConfig.cloudfunctionRoot === 'functions')
