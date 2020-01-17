const shell = require('shelljs')
const assert = require('assert')
const fs = require('fs')
const path = require('path')

function resolve (dir) {
  return path.join(__dirname, '..', dir)
}

// 复制预设的问题答案，创建项目并尝试构建要求无error
shell.cp('testfile/wx-cross-web-meta.js', './meta.js').code !== 0 && shell.exit(1)
shell.exec('mpx init demo-wx-cross-web --offline .').code !== 0 && shell.exit(1)
shell.exec('cd demo-wx-cross-web && npm i && npm run build').code !== 0 && shell.exit(1)

// 检查相应平台的配置文件是否在对的位置
assert(fs.existsSync(resolve('demo-wx-cross-web/dist/wx/project.config.json')))

assert(fs.existsSync(resolve('demo-wx-cross-web/static/wx/project.config.json')))
assert(!fs.existsSync(resolve('demo-wx-cross-web/static/wx/index.html')))

shell.exec('npm run build:cross').code !== 0 && shell.exit(1)

assert(fs.existsSync(resolve('demo-wx-cross-web/dist/ali/mini.project.json')))

assert(fs.existsSync(resolve('demo-wx-cross-web/static/ali/mini.project.json')))

// 检查跨平台下不应该在根目录有配置文件
assert(!fs.existsSync(resolve('demo-wx-cross-web/project.config.json')))
