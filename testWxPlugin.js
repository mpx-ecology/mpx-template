const shell = require('shelljs')

shell.exec('cp testfile/wx-plugin-meta.js ./meta.js')

shell.exec('mpx init demo-wx-plugin --offline .')

shell.exec('cd demo-wx-plugin && npm i && npm run build')
