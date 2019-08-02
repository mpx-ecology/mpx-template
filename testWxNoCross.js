const shell = require('shelljs')
const assert = require('assert')
const fs = require('fs')
const path = require('path')

function resolve (dir) {
  return path.join(__dirname, dir)
}

shell.exec('cp testfile/wx-no-cross-meta.js ./meta.js')

shell.exec('mpx init demo-wx-no-cross --offline .')

shell.exec('cd demo-wx-no-cross && npm i && npm run build')

assert(fs.existsSync(resolve('demo-wx-no-cross/dist/project.config.json')))
