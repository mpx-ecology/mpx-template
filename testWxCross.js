const shell = require('shell')

shell.exec('cp testfile/meta.js .')

shell.exec('mpx init demo-wx-cross --offline')

shell.exec('cd demo-wx-cross && npm i && npm run build')
