const shell = require('shelljs')
const path = require('path')
const { checkStatic } = require('./util')

function resolve (dir) {
  return path.join(__dirname, '..', dir)
}

const projectFolder = resolve('demo-wx-no-cross')

shell.cp('testfile/wx-no-cross-meta.js', './meta.js').code !== 0 && shell.exit(1)
shell.exec('mpx init demo-wx-no-cross --offline .').code !== 0 && shell.exit(1)
shell.exec('cd demo-wx-no-cross && npm i && npm run build').code !== 0 && shell.exit(1)

checkStatic(projectFolder, {isCross: true})
