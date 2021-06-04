import {SinonSandbox} from 'sinon'
import * as sinon from 'sinon'

//eslint-disable-next-line @typescript-eslint/no-explicit-any
const globalAny = global as any

if (!globalAny.sandbox) {
  beforeEach(() => {
    globalAny.sandbox = sinon.createSandbox()
  })

  afterEach(() => {
    globalAny.sandbox.restore()
  })
}

export const sandbox = () => globalAny.sandbox as SinonSandbox