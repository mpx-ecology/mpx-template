module.exports = {
  sequence: [ // spec 文件顺序
    // 'preTest',
    'list',
  ],
  {% if tsSupport %}
  useTS: true,
  {% endif %}
  testSuitsDir: 'test/e2e/components' // spec 文件存放目录
}
