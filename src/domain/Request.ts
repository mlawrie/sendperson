export const HTTP_METHODS = ['GET', 'PUT', 'POST', 'PATCH', 'DELETE']
export type HttpMethod = typeof HTTP_METHODS[number]

export const BODY_FORMATS = ['none', 'multipart/form-data', 'application/x-www-form-urlencoded', 'text/plain', 'text/html', 'text/xml', 'application/json', 'text/javascript']
export type BodyFormat = typeof BODY_FORMATS[number]

export const FORM_FIELDS_BODY_FORMATS: BodyFormat[] = ['multipart/form-data', 'application/x-www-form-urlencoded']
export const TEXT_BODY_FORMATS: BodyFormat[] = ['text/plain', 'text/html', 'text/xml', 'application/json']

export type RequestParam = Readonly<{
  key: string
  value: string
  description: string
  enabled: boolean
}>

export type RequestBody = Readonly<{
  format: BodyFormat
  fields: RequestParam[]
  text: string
}>

export type Request = Readonly<{
  headers: RequestParam[]
  queryParams: RequestParam[]
  method: HttpMethod
  uri: string
  body: RequestBody
}>

export const defaultParam = (): RequestParam => ({key: '', description: '', value: '', enabled: true})

export const defaultRequest = (): Request => ({
  method: 'GET',
  uri: '',
  queryParams: [defaultParam(), defaultParam()],
  headers: [defaultParam(), defaultParam()],
  body: {
    format: 'none',
    text: '',
    fields: [defaultParam(), defaultParam()]
  }
})