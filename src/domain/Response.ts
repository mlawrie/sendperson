export type Response = Readonly<{
  status: number
  completed: boolean
  performedAtUtc: number
  latency: number
  body: string
}>

export const defaultResponse = (): Response => ({
  status: 0,
  performedAtUtc: Date.now(),
  completed: false,
  latency: 0,
  body: ''
})