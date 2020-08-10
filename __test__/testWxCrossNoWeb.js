const shell = require('shelljs')
const path = require('path')
const { checkStatic } = require('./util')

function resolve (dir) {
  return path.join(__dirname, '..', dir)
}

const projectFolder = resolve('demo-wx-cross-noweb')

// 复制预设的问题答案，创建项目并尝试构建要求无error
shell.cp('testfile/wx-cross-noweb-meta.js', './meta.js').code !== 0 && shell.exit(1)
shell.exec('mpx init demo-wx-cross-noweb --offline .').code !== 0 && shell.exit(1)
shell.exec('cd demo-wx-cross-noweb && npm i && npm run build && npm run build:cross && npm run puretest').code !== 0 && shell.exit(1)

checkStatic(projectFolder, {isCross: true})
