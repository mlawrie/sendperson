import {DeepPartial, DeepReadonly} from 'utility/types'
import * as fs from 'fs'
import * as path from 'path'
import * as util from 'util'
import {userDataPath} from 'utility/electronUtils'
import deepExtend from 'deep-extend'

const readFile = util.promisify(fs.readFile)
const writeFile = util.promisify(fs.writeFile)

export type AppPreferences = DeepReadonly<{
  window: {
    width: number
    height: number
  }
}>

const defaultPreferences: AppPreferences = {
  window: {
    width: 1000,
    height: 800
  }
}

const preferencesPath = () => path.join(userDataPath(), 'appPreferences.json')

export const appPreferences = {
  read: async (): Promise<AppPreferences> => {
    if (!fs.existsSync(preferencesPath())) {
      return defaultPreferences
    }
    const preferencesString = await readFile(preferencesPath())
    return JSON.parse(preferencesString.toString())
  },

  save: async (preferences: DeepPartial<AppPreferences>): Promise<void> => {
    const existingPreferences = await appPreferences.read()
    return writeFile(preferencesPath(), JSON.stringify(deepExtend(existingPreferences, preferences)))
  }
}