const shell = require('shelljs')

shell.exec('cp testfile/wx-no-cross-meta.js ./meta.js')

shell.exec('mpx init demo-wx-no-cross --offline .')

shell.exec('cd demo-wx-no-cross && npm i && npm run build && npm run build:cross')
