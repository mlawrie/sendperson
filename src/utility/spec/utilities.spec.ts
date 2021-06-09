import {replaceAt, removeAt} from 'utility/utilities'
import {expect} from 'utility/spec/specHelper'

describe('utilities', () => {
  describe('replaceAt', () => {
    it('replaces an element of an array by index', () => {
      const result = replaceAt(['foo', 'bar', 'baz'], 1,'banana')
      expect(result).to.eql(['foo', 'banana', 'baz'])
    })
  })

  describe('removeAt', () => {
    it('removes an element of an array by index', () => {
      const result = removeAt(['foo', 'bar', 'baz'], 1)
      expect(result).to.eql(['foo', 'baz'])
    })
  })
})