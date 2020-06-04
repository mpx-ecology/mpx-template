const path = require('path')

function normalizeArr (arrCfg) {
  if (typeof arrCfg === 'string') {
    return [arrCfg]
  } else if (Array.isArray(arrCfg) && arrCfg.length) {
    return arrCfg
  }
}

module.exports = function getEntries (cacheGroups) {
  const entries = {}
  let count = 0
  cacheGroups.forEach((cacheGroup) => {
    const modes = normalizeArr(cacheGroup.modes) || ['']
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

  return entries
}
