import { removeFromArray, removeFromObj } from './utils'

describe('removeFromArray', () => {
  it('should remove item from array', () => {
    expect(removeFromArray([1, 2, 3, 4], 3)).toEqual([1, 2, 4])
  })

  it('should remove all instances of item from array', () => {
    expect(removeFromArray([3, 1, 3, 2, 3, 4, 3, 3, 3], 3)).toEqual([1, 2, 4])
  })

  it('should do nothing if entry is not in array', () => {
    expect(removeFromArray([1, 2, 3, 4], 5)).toEqual([1, 2, 3, 4])
  })
})

describe('removeFromObj', () => {
  it('should remove item from object', () => {
    expect(removeFromObj({ test: 'string', another: 'string2' }, 'test')).toEqual({ another: 'string2' })
  })

  it('should do nothing if entry is not in object', () => {
    expect(removeFromObj({ test: 'string', another: 'string2' }, 'nonexistent-key')).toEqual({ test: 'string', another: 'string2' })
  })
})
