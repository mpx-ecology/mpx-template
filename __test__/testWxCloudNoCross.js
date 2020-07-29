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

assert(fs.existsSync(resolve(`${projectFolder}/dist/project.config.json`)))
assert(fs.existsSync(resolve(`${projectFolder}/project.config.json`)))
assert(!fs.existsSync(resolve(`${projectFolder}/static/wx/project.config.json`)))
