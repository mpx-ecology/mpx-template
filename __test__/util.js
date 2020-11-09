/**
 * @file 公用测试方法
 */
const assert = require('assert')
const fs = require('fs')
const path = require('path')

const checkFiles = (context, existFiles = [], noExistFiles = []) => {
  existFiles.forEach((file) => {
    assert(fs.existsSync(path.join(context, file)))
  })

  noExistFiles.forEach((file) => {
    assert(!fs.existsSync(path.join(context, file)))
  })
}

function resolve (dir = '') {
  return path.join(__dirname, '..', dir)
}

function getName (filename) {
  return path.basename(filename, path.extname(filename))
}

module.exports = {
  checkFiles,
  resolve,
  getName
}
