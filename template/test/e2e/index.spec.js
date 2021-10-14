/**
 * @file e2e test example
 * 首先开启工具安全设置中的 CLI/HTTP 调用功能
 * docs of miniprogram-automator: https://developers.weixin.qq.com/miniprogram/dev/devtools/auto/quick-start.html
 */
import automator from '@didi/e2e-extension'
const path = require('path')

describe('index', () => {
  let miniProgram
  let page

  beforeAll(async () => {
    miniProgram = await automator.launch({
      projectPath: path.resolve(__dirname, '../../dist/wx')
    })
    page = await miniProgram.reLaunch('/pages/index')
    await page.waitFor(500)
  }, 30000)

  it('desc', async () => {
    const desc = await page.$('list--list')
    expect(desc.tagName).toBe('view')
    expect(await desc.text()).toContain('手机')
  })

  afterAll(async () => {
    await miniProgram.close()
  })
})
