export const HTTP_METHODS = ['GET', 'PUT', 'POST', 'PATCH', 'DELETE']
export type HttpMethod = typeof HTTP_METHODS[number]

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
}>

export const defaultParam = (): Param => ({key: '', description: '', value: '', enabled: true})

export const defaultRequest = (): Request => ({
  method: 'GET',
  uri: '',
  queryParams: [defaultParam(), defaultParam(), defaultParam()],
  headers: [defaultParam(), defaultParam(), defaultParam()]
})