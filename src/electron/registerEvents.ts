import {BrowserWindow} from 'electron'
import {appPreferences} from '../utility/appPreferences'
import {throttle} from '../utility/throttle'

export const registerEvents = (window: BrowserWindow) => {
  const saveDimensions = throttle(() => {
    try {
      const {width, height} = window.getBounds()
      appPreferences.save({window: {width, height}})
    } catch (e) {
      console.error('error encountered while trying to save window size:')
      console.error(e)
    }
  }, 1000, true)
  window.on('resize', saveDimensions)
}