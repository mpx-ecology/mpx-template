const shell = require('shelljs')
const assert = require('assert')
const fs = require('fs')
const path = require('path')

function resolve (dir) {
  return path.join(__dirname, dir)
}

// 复制预设的问题答案，创建项目并尝试构建要求无error
shell.exec(`
  cd ..
  cp testfile/wx-cross-meta.js ./meta.js &&
  mpx init demo-wx-cross --offline . &&
  cd demo-wx-cross && npm i && npm run build && npm run build:cross
`).code !== 0 && shell.exit(1)

// 检查相应平台的配置文件是否在对的位置
assert(fs.existsSync(resolve('demo-wx-cross/dist/wx/project.config.json')))

assert(fs.existsSync(resolve('demo-wx-cross/static/wx/project.config.json')))

assert(fs.existsSync(resolve('demo-wx-cross/dist/ali/mini.project.json')))

assert(fs.existsSync(resolve('demo-wx-cross/static/ali/mini.project.json')))

// 检查跨平台下不应该在根目录有配置文件
assert(!fs.existsSync(resolve('demo-wx-cross/project.config.json')))
