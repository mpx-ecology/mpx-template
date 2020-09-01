const shell = require('shelljs')
const assert = require('assert')
const fs = require('fs')
const path = require('path')

function resolve (dir) {
  return path.join(__dirname, '..', dir)
}

shell.cp('testfile/wx-plugin-meta.js', './meta.js').code !== 0 && shell.exit(1)
shell.exec('mpx init demo-wx-plugin --offline .').code !== 0 && shell.exit(1)
shell.exec('cd demo-wx-plugin && npm i && npm run build').code !== 0 && shell.exit(1)

assert(fs.existsSync(resolve('demo-wx-plugin/dist/wx/project.config.json')))
assert(fs.existsSync(resolve('demo-wx-plugin/dist/wx/plugin/plugin.json')))
assert(fs.existsSync(resolve('demo-wx-plugin/dist/wx/miniprogram/pages/index.wxml')))
