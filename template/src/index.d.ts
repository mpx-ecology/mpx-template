// declaration for mpx mode
declare let __mpx_mode__: 'wx' | 'ali' | 'swan' | 'qq' | 'tt' | 'web'
// Wildcard module declarations for ?resolve case
declare module '*?resolve' {
  const resourcePath: string
  export default resourcePath
}
