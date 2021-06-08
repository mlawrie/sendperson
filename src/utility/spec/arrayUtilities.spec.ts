import {replaceAt, removeAt} from 'utility/arrayUtilities'
import {expect} from 'utility/spec/specHelper'

describe('arrayUtilities', () => {
  describe('replaceAt', () => {
    it('replaces an element of an array by index', () => {
      const result = replaceAt(['foo', 'bar', 'baz'], 'banana', 1)
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