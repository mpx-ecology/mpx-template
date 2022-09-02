module.exports = {
  extends: ['@mpxjs'],
  rules: {
    // .mpx文件规则
  },
  overrides: [
    {
      files: ['**/*.ts'],
      rules: {
        // .ts文件规则
      }
    },
    {
      files: ['**/*.js'],
      rules: {
        // .js文件规则
      }
    }
  ]
}
