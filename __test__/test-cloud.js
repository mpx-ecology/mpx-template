const shell = require('shelljs')
const { checkFiles, resolve, getName } = require('./util')

const name = getName(__filename)
const context = resolve()
const projectContext = resolve(name)

shell.exec(`rm -rf ${projectContext}`).code !== 0 && shell.exit(1)
shell.exec(`cd ${context} && mpx init ${name} --offline . --mock cloudFunc,functional`).code !== 0 && shell.exit(1)
shell.exec(`cd ${projectContext} && npm i && npm run build`).code !== 0 && shell.exit(1)

checkFiles(projectContext, ['src/functional-pages', 'src/functions', 'dist/wx/functional-pages', 'dist/wx/functions'])
