const shell = require('shelljs')

shell.cp('testfile/wx-plugin-meta.js', './meta.js').code !== 0 && shell.exit(1)
shell.exec('mpx init demo-wx-plugin --offline .').code !== 0 && shell.exit(1)
shell.exec('cd demo-wx-plugin && npm i && npm run build').code !== 0 && shell.exit(1)

assert(fs.existsSync(resolve('demo-wx-plugin/dist/project.config.json')))
assert(fs.existsSync(resolve('demo-wx-plugin/dist/plugin/app.json')))
assert(fs.existsSync(resolve('demo-wx-plugin/dist/miniprogram/pages/index.wxml')))
