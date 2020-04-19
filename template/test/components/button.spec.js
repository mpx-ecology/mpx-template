/**
 * @file unit test example
 * docs of miniprogram-simulate: https://github.com/wechat-miniprogram/miniprogram-simulate
 */
const {loadComponent} = require('../../util')
const simulate = require('miniprogram-simulate')

describe('test list component', () => {
  it('should render list correct', function () {
    const id = loadComponent('src/components/list.mpx')
    const comp = simulate.render(id) // 渲染自定义组件

    const parent = document.createElement('parent-wrapper') // 创建容器节点
    comp.attach(parent) // 将组件插入到容器节点中，会触发 attached 生命周期

    expect(comp.dom.innerHTML).toBe('') // 判断组件渲染结果
    // 执行其他的一些测试逻辑
  })
})
