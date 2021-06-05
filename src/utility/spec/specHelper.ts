import {SinonSandbox} from 'sinon'
import * as sinon from 'sinon'
import * as electron from 'electron'
import sinonChai from 'sinon-chai'
import chai from 'chai'

chai.use(sinonChai)

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
export const expect = chai.expect
export const afterPromises = () => new Promise((resolve) => process.nextTick(resolve))
export const sandbox = () => globalAny.sandbox as SinonSandbox