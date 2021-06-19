import {defaultRequest, Request} from 'domain/Request'
import {defaultResponse, Response} from 'domain/Response'
import { v4 as uuidv4 } from 'uuid'

export type Transaction = Readonly<{
  request: Request
  response?: Response
  uuid: string
}>

export const defaultTransaction = (): Transaction => ({
  request: defaultRequest(),
  response: defaultResponse(),
  uuid: uuidv4()
})