export type DeepReadonly<T> = {
  readonly [K in keyof T]: DeepReadonly<T[K]>
}

export type Readonly<T> = {
  readonly [K in keyof T]: T[K]
}

export type DeepPartial<T> = {
  [P in keyof T]?: DeepPartial<T[P]>
}

export const HTTP_METHODS = ['GET', 'PUT', 'POST', 'PATCH']
export type HttpMethod = typeof HTTP_METHODS[number]