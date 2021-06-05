import {afterPromises, expect, sandbox} from 'utility/spec/specHelper'
import {registerEvents} from 'electron/registerEvents'
import {appPreferences} from 'utility/appPreferences'

describe('registerEvents', () => {
  it('saves preferences on window resize', async () => {
    sandbox().stub(appPreferences, 'save')
    sandbox().useFakeTimers()
    const mockWindow = {on: sandbox().stub().callsArg(1), getBounds: () => ({width: 124, height: 33})}

    registerEvents(mockWindow as any)

    expect(appPreferences.save).to.have.been.calledWith({window: {width: 124, height: 33}})
  })

  it('swallows exceptions if getBounds fails', async () => {
    sandbox().stub(console, 'error')
    sandbox().stub(appPreferences, 'save')
    sandbox().useFakeTimers()
    const mockWindow = {on: sandbox().stub().callsArg(1), getBounds: () => {throw new Error('banana')}}

    registerEvents(mockWindow as any)

    await afterPromises()
    expect(console.error).to.have.been.calledWith('error encountered while trying to save window size:')
  })

  it('logs exceptions if save fails', async () => {
    sandbox().stub(console, 'error')
    sandbox().stub(appPreferences, 'save').returns(Promise.reject('noperoo'))
    sandbox().useFakeTimers()
    const mockWindow = {on: sandbox().stub().callsArg(1), getBounds: () => ({width: 124, height: 33})}

    registerEvents(mockWindow as any)

    await afterPromises()
    expect(console.error).to.have.been.calledWith('noperoo')
  })
})