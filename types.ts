export type NavigationType = {
  navigate: Function
  goBack: Function
}
export type RouteType = {
  key: string
  name: string
  params: any
}
export type Result = {
  assetId: string
  base64: string
  cancelled: boolean
  fileName: string
  fileSize: number
  height: number
  type: string
  uri: string
  width: number
}

export type Work = {
  exists: boolean
  isDirectory: boolean
  md5?: string | undefined
  modificationTime: number | undefined
  size: number | undefined
  uri: string
}
