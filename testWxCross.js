const shell = require('shelljs')

shell.exec('cp testfile/wx-cross-meta.js ./meta.js')

shell.exec('mpx init demo-wx-cross --offline .')

shell.exec('cd demo-wx-cross && npm i && npm run build && npm run build:cross')
