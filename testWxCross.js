const shell = require('shelljs')
const assert = require('assert')
const fs = require('fs')
const path = require('path')

function resolve (dir) {
  return path.join(__dirname, dir)
}

shell.exec(`
  cp testfile/wx-cross-meta.js ./meta.js &&
  mpx init demo-wx-cross --offline . &&
  cd demo-wx-cross && npm i && npm run build && npm run build:cross
`).code !== 0 && shell.exit(1)

assert(fs.existsSync(resolve('demo-wx-cross/dist/wx/project.config.json')))
