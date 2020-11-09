const shell = require('shelljs')
const { checkFiles, resolve, getName } = require('./util')

const name = getName(__filename)
const context = resolve()
const projectContext = resolve(name)

shell.exec(`rm -rf ${projectContext}`).code !== 0 && shell.exit(1)
shell.exec(`cd ${context} && node_modules/.bin/mpx init ${name} --offline . --mock needDll,cross`).code !== 0 && shell.exit(1)
shell.exec(`cd ${projectContext} && npm i && npm run build:dll && npm run build:cross`).code !== 0 && shell.exit(1)

checkFiles(projectContext, ['dist/wx', 'dist/ali', 'dll/lib'])
