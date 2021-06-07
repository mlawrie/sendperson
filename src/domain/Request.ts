export const HTTP_METHODS = ['GET', 'PUT', 'POST', 'PATCH', 'DELETE']
export type HttpMethod = typeof HTTP_METHODS[number]

export type QueryParam = Readonly<{
  key: string
  value: string
  description: string
}>

export type Request = Readonly<{
  queryParams: QueryParam[]
  method: HttpMethod
  uri: string
}>

export const defaultRequest = (): Request => ({
  method: 'GET',
  uri: '',
  queryParams: []
})