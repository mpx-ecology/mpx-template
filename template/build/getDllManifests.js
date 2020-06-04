const fs = require('fs')
const getConfig = require('../config/index')
const dllConfig = require('./dll.config')
const path = require('path')
const chalk = require('chalk')

module.exports = function getDllManifests (isProduction) {
  const supportedModes = getConfig(isProduction).supportedModes
  const result = []
  if (fs.existsSync(dllConfig.path)) {
    const files = fs.readdirSync(dllConfig.path)
    files.forEach((file) => {
      if (/\.manifest\.json$/.test(file)) {
        const content = JSON.parse(fs.readFileSync(path.join(dllConfig.path, file), 'utf8'))
        const filename = path.basename(content.name)
        const modeReg = new RegExp(`^(${supportedModes.join('|')})\\.`)
        let mode = ''
        if (modeReg.test(filename)) {
          mode = modeReg.exec(filename)[1]
        }
        result.push({
          mode,
          content
        })
      }
    })
  } else {
    console.log(chalk.yellow('  No valid dll manifest found, exec "npm run build:dll" firstly.\n'))
  }
  return result
}

