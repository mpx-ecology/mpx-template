import mpx from '@mpxjs/core'
import apiProxy from '@mpxjs/api-proxy'

mpx.use(apiProxy, { usePromise: true })
// app.js
App({})
