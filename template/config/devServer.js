const path = require('path')
module.exports = {
  static: {
    directory: path.resolve(__dirname, '/')
  },
  allowedHosts: 'auto',
  compress: true,
  client: {
    overlay: {
      errors: true,
      warnings: false
    }
  },
  port: 'auto'
}
