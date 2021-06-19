import * as sinon from 'sinon'
import {SinonSandbox} from 'sinon'
import sinonChai from 'sinon-chai'
import chai from 'chai'
import {fireEvent, render} from '@testing-library/react'
import React, {Fragment} from 'react'

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
export const updateInput = (input: HTMLElement, value: string) => fireEvent.change(input, {target: {value}})

export type TestContextRenderFunction<TContext> = (renderContents: (t: TContext) => JSX.Element) => JSX.Element

export const renderGetContext = <TContext extends Record<string, Function | unknown>>
  (renderFunc: TestContextRenderFunction<TContext>) => {

  let theContext: TContext

  const testContent = (context: TContext): JSX.Element => {
    theContext = context /* yes.. this is how it works */
    return <Fragment/>
  }

  render(renderFunc(testContent))

  return () => theContext
}


