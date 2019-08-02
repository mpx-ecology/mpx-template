const shell = require('shelljs')
const assert = require('assert')
const fs = require('fs')
const path = require('path')

function resolve (dir) {
  return path.join(__dirname, dir)
}

shell.exec('cp testfile/wx-cross-meta.js ./meta.js')

shell.exec('mpx init demo-wx-cross --offline .')

shell.exec('cd demo-wx-cross && npm i && npm run build && npm run build:cross')

assert(fs.existsSync(resolve('demo-wx-no-cross/dist/wx/project.config.json')))
