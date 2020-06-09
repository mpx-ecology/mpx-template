const path = require('path')

function normalizeArr (arrCfg) {
  if (Array.isArray(arrCfg) && arrCfg.length) {
    return arrCfg
  } else if (arrCfg) {
    return [arrCfg]
  }
}

module.exports = function getEntries (cacheGroups, modes) {
  const entries = {}
  let count = 0
  modes = normalizeArr(modes) || ['']
  cacheGroups = normalizeArr(cacheGroups)
  if (cacheGroups) {
    cacheGroups.forEach((cacheGroup) => {
      const root = cacheGroup.root || ''
      modes.forEach((mode) => {
        // 确保生成的name为posix风格路径，便于后续解析
        const entryName = path.posix.join(root, (mode ? `${mode}.` : '') + (cacheGroup.name || '' + count++))
        const entry = normalizeArr(cacheGroup.entries)
        if (entry) {
          entries[entryName] = entry
        }
      })
    })
  }

  return entries
}
