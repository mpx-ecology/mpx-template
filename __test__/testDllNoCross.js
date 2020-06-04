const shell = require('shelljs')

// 复制预设的问题答案，创建项目并尝试构建要求无error
shell.cp('testfile/wx-dll-no-cross-meta.js', './meta.js').code !== 0 && shell.exit(1)
shell.exec('mpx init wx-dll-no-cross-meta --offline .').code !== 0 && shell.exit(1)
shell.exec('cd wx-dll-no-cross-meta && npm i && npm run build').code !== 0 && shell.exit(1)
