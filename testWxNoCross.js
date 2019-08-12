const shell = require('shelljs')
const assert = require('assert')
const fs = require('fs')
const path = require('path')

function resolve (dir) {
  return path.join(__dirname, dir)
}

shell.exec(`
  cp testfile/wx-no-cross-meta.js ./meta.js &&
  mpx init demo-wx-no-cross --offline . &&
  cd demo-wx-no-cross && npm i && npm run build
`).code !== 0 && shell.exit(1)

assert(fs.existsSync(resolve('demo-wx-no-cross/dist/project.config.json')))
