const fs = require('fs')
const shell = require('shelljs')
const path = require('path')
const dest = path.resolve(__dirname, '../dist/wx')
 
process.stdin.resume()
 
process.on('SIGINT', () => {
  // shell.rm('-rf', `${dest}/app-test.js`)
  // shell.rm('-rf', `${dest}/app-back.js`)
  // console.log('Got SIGINT.  Press Control-D to exit.')
})
 
const wxFiles = fs.existsSync(`${dest}/app.js`)
if (!wxFiles) {
  shell.exec('npm run build')
}
 
shell
  .echo(`Object.defineProperty(__wxConfig,'test',{get(){return true}});\n`)
  .cat(`${dest}/app.js`)
  .to(`${dest}/app-test.js`)
 
let hasResult = false
let oldCode = fs.readFileSync(`${dest}/app-test.js`, { encoding: 'utf-8' })
let reg = /Object\((\w+)\["createApp"\]\)((?!\(\{).)*/
 
if (reg.test(oldCode)) {
  hasResult = true
  let [str, arg] = reg.exec(oldCode)
  let newCode = oldCode.replace(`${str}({`, `
${str}({
  mixin: ${arg}["default"].mixin,
  xfetch: ${arg}["default"].xfetch,`
  )
  fs.writeFileSync(`${dest}/app-test.js`, newCode, { encoding: 'utf-8' })
}
 
let zipReg = /Object\((\w)\.(\w+)\)((?!\(\{).)*/
if (!hasResult && zipReg.test(oldCode)) {
  let [str, arg1, arg2] = zipReg.exec(oldCode)
  let newCode = ''
  if (arg2 === 'createApp') {
    newCode = oldCode.replace(`${str}({`, `${str}({mixin: ${arg1}.default.mixin,xfetch: ${arg1}.default.xfetch,`)
    fs.writeFileSync(`${dest}/app-test.js`, newCode, { encoding: 'utf-8' })
  } else if (arg2 === 'a') {
    newCode = oldCode.replace(`${str}({`, `${str}({mixin: ${arg1}.d.mixin,xfetch: ${arg1}.d.xfetch,`)
  }
  if (newCode) {
    hasResult = true
    fs.writeFileSync(`${dest}/app-test.js`, newCode, { encoding: 'utf-8' })
  } else {
    hasResult = false
  }
}
 
if (!hasResult) {
  console.log('自动添加代码失败！需要手动修改e2e.js文件里面正则表达式或者手动注入')
}
 
shell.cp(`${dest}/app.js`, `${dest}/app-back.js`)
shell.cp(`${dest}/app-test.js`, `${dest}/app.js`)
 
if (!shell.which('jest')) {
  shell.echo('Sorry, this script requires jest')
  shell.exit(1)
}
 
shell.exec('jest --colors', function (code, stdout, stderr) {
  console.log('退出')
  shell.rm('-rf', `${dest}/app.js`)
  shell.cp(`${dest}/app-back.js`, `${dest}/app.js`)
  shell.rm('-rf', `${dest}/app-test.js`)
  shell.rm('-rf', `${dest}/app-back.js`)
  if (code !== 0) {
    shell.echo('Error: jest failed')
    shell.exit(1)
  }
})