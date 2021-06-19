export type DeepReadonly<T> = {
  readonly [K in keyof T]: DeepReadonly<T[K]>
}

export type DeepPartial<T> = {
  [P in keyof T]?: DeepPartial<T[P]>
}


