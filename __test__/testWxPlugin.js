const shell = require('shelljs')

shell.exec(`
  cd .. &&
  cp testfile/wx-plugin-meta.js ./meta.js &&
  mpx init demo-wx-plugin --offline . &&
  cd demo-wx-plugin && npm i && npm run build
`).code !== 0 && shell.exit(1)
