const devEnv = require('./dev.env')
const prodEnv = require('./prod.env')

module.exports = function getConfig (isProduction) {
  return {
    env: isProduction ? prodEnv : devEnv,
    supportedModes:['wx', 'ali', 'swan', 'qq', 'tt'{% if transWeb %}, 'web'{% endif %}]
  }
}
