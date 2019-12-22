const shell = require('shelljs')
const assert = require('assert')
const fs = require('fs')
const path = require('path')

function resolve (dir) {
  return path.join(__dirname, '..', dir)
}

// 复制预设的问题答案，创建项目并尝试构建要求无error
shell.cp('testfile/wx-cross-noweb-meta.js', './meta.js').code !== 0 && shell.exit(1)
shell.exec('mpx init demo-wx-cross-noweb --offline .').code !== 0 && shell.exit(1)
shell.exec('cd demo-wx-cross-noweb && npm i && npm run build && npm run build:cross').code !== 0 && shell.exit(1)

// 检查相应平台的配置文件是否在对的位置
assert(fs.existsSync(resolve('demo-wx-cross-noweb/dist/wx/project.config.json')))

assert(fs.existsSync(resolve('demo-wx-cross-noweb/static/wx/project.config.json')))

assert(fs.existsSync(resolve('demo-wx-cross-noweb/dist/ali/mini.project.json')))

assert(fs.existsSync(resolve('demo-wx-cross-noweb/static/ali/mini.project.json')))

// 检查跨平台下不应该在根目录有配置文件
assert(!fs.existsSync(resolve('demo-wx-cross-noweb/project.config.json')))
