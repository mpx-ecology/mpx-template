const shell = require('shelljs')
const assert = require('assert')
const fs = require('fs')
const path = require('path')

function resolve (dir) {
  return path.join(__dirname, '..', dir)
}

const projectFolder = 'demo-wx-no-cross-cloud'

shell.cp('testfile/wx-no-cross-cloud-meta.js', './meta.js').code !== 0 && shell.exit(1)
shell.exec(`mpx init ${projectFolder} --offline .`).code !== 0 && shell.exit(1)
shell.exec(`cd ${projectFolder} && npm i && npm run build`).code !== 0 && shell.exit(1)

// 看静态文件夹中没有项目配置，这个模式下，static里应该什么都没有
assert(!fs.existsSync(resolve(`${projectFolder}/static/wx/project.config.json`)))

// 项目根目录下有项目配置
assert(fs.existsSync(resolve(`${projectFolder}/project.config.json`)))

// 看dist里有项目配置
assert(fs.existsSync(resolve(`${projectFolder}/dist/project.config.json`)))

// dist里有miniprogram文件夹
assert(fs.existsSync(resolve(`${projectFolder}/dist/miniprogram`)))

// dist里有functions文件夹
assert(fs.existsSync(resolve(`${projectFolder}/dist/functions`)))

// 检查项目配置中对小程序路径和云函数路径是否正确
const projectConfig = require(resolve(`${projectFolder}/dist/project.config.json`))
assert(projectConfig.miniprogramRoot === 'miniprogram')
assert(projectConfig.cloudfunctionRoot === 'functions')
