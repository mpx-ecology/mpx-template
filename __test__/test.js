const { exec } = require('child_process')
const bddStdin = require('bdd-stdin')

const initProjectRunner = exec('mpx init demo-wx-cross-web')

// initProjectRunner.stdout.setEncoding('utf8')

initProjectRunner.stdout.on('data', (data) => {
  console.log(`stdout: ${data}`)
  if (data.includes('请选择小程序项目所属平台（目前仅微信下支持跨平台输出）')) {
    bddStdin(bddStdin.keys.down, '\n')
  }
  // initProjectRunner.stdin.write('\n')
})

initProjectRunner.stdout.on('pause', () => {
  console.log('暂停')
})
