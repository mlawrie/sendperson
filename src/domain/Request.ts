export const HTTP_METHODS = ['GET', 'PUT', 'POST', 'PATCH', 'DELETE']
export const BODY_FORMATS = ['none', 'form-data', 'x-www-form-urlencoded', 'text']
export const BODY_TEXT_FORMATS = ['text/plain', 'text/html', 'text/xml', 'application/json', 'text/javascript']
export type HttpMethod = typeof HTTP_METHODS[number]
export type BodyFormat = typeof BODY_FORMATS[number]
export type BodyTextFormat = typeof BODY_TEXT_FORMATS[number]

export type Param = Readonly<{
  key: string
  value: string
  description: string
  enabled: boolean
}>

export type Request = Readonly<{
  headers: Param[]
  queryParams: Param[]
  method: HttpMethod
  uri: string
  bodyTextFormat: BodyTextFormat,
  bodyFormat: BodyFormat
}>

export const defaultParam = (): Param => ({key: '', description: '', value: '', enabled: true})

export const defaultRequest = (): Request => ({
  method: 'GET',
  uri: '',
  queryParams: [defaultParam(), defaultParam(), defaultParam()],
  headers: [defaultParam(), defaultParam(), defaultParam()],
  bodyFormat: 'none',
  bodyTextFormat: 'application/json'
})