import {replaceAt} from 'utility/replaceAt'
import {expect} from 'utility/spec/specHelper'

describe('replaceAt', () => {
  it('replaces an element of an array by index', () => {
    const result = replaceAt(['foo', 'bar', 'baz'],'banana', 1)
    expect(result).to.eql([ 'foo', 'banana', 'baz' ])
  })
})