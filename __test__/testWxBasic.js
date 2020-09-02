const shell = require('shelljs')
const path = require('path')
const { checkStatic } = require('./util')

function resolve (dir) {
  return path.join(__dirname, '..', dir)
}

const projectFolder = resolve('demo-wx-only')

shell.cp('testfile/wx-basic-meta.js', './meta.js').code !== 0 && shell.exit(1)
shell.exec('mpx init demo-wx-only --offline .').code !== 0 && shell.exit(1)
shell.exec('cd demo-wx-only && npm i && npm run build').code !== 0 && shell.exit(1)

checkStatic(projectFolder)
