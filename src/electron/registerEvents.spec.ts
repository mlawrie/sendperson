import {expect, sandbox} from '../utility/specHelper'
import {registerEvents} from './registerEvents'
import {appPreferences} from '../utility/appPreferences'

describe('registerEvents', () => {
  it('saves preferences on window resize', async () => {
    sandbox().stub(appPreferences, 'save')
    sandbox().useFakeTimers()
    const mockWindow = {on: sandbox().stub().callsArg(1), getBounds: () => ({width: 124, height: 33})}

    registerEvents(mockWindow as any)

    expect(appPreferences.save).to.have.been.calledWith({window: {width: 124, height: 33}})
  })

  it('swallows exceptions if save fails', () => {
    sandbox().stub(appPreferences, 'save')
    sandbox().useFakeTimers()
    const mockWindow = {on: sandbox().stub().callsArg(1), getBounds: () => {throw new Error('banana')}}
    registerEvents(mockWindow as any)
  })
})