import * as randomstring from 'randomstring'
import * as path from 'path'
import {appPreferences} from './appPreferences'
import * as fs from 'fs'
import * as util from 'util'
import { expect } from 'chai'
import * as electronUtils from './electronUtils'
import {sandbox} from './specHelper'
const readFile = util.promisify(fs.readFile)
const writeFile = util.promisify(fs.writeFile)


describe('appPreferences', () => {
  let randomDirName: string

  beforeEach(() => {
    randomDirName = path.join('dist', `test-${randomstring.generate()}`)
    sandbox().stub(electronUtils, 'userDataPath').returns(randomDirName)

    if (!fs.existsSync(randomDirName)) {
      fs.mkdirSync(randomDirName)
    }
  })

  describe('read', () => {
    it('reads preferences', async () => {
      await writeFile(path.join(randomDirName, 'appPreferences.json'), JSON.stringify({window: {width: 100}}))
      expect(await appPreferences.read()).to.eql({window: {width: 100}})
    })

    it('reads empty preferences with defaults', async () => {
      expect(await appPreferences.read()).to.eql({window: {width: 1000, height: 800}})
    })
  })

  describe('save', () => {
    it('saves config changes, only altering what is provided', async () => {
      await appPreferences.save({window: {width: -10}})
      const savedContents = await readFile(path.join(randomDirName, 'appPreferences.json'))
      expect(savedContents.toString()).to.eql('{"window":{"width":-10,"height":800}}')
    })
  })
})