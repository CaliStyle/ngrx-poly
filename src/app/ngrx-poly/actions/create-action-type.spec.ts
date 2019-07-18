import { createActionType } from './create-action-type'
import { Op } from './ops'

describe('createActionType', () => {
  it('should return path with one item', () => {
    expect(createActionType(Op.FIND_ALL, 'test')).toBe(`ngrx-poly/test/find-all`)
  })

  it('should chain all entries in action name', () => {
    expect(createActionType(Op.FIND_ALL, 'test', 'chain')).toBe(`ngrx-poly/test/chain/find-all`)
    expect(createActionType(Op.FIND_ALL, 'test', 'chain', 'links')).toBe(`ngrx-poly/test/chain/links/find-all`)
  })

  it('should filter null entries', () => {
    expect(createActionType(Op.FIND_ALL, 'test', null, '', 'chain')).toBe(`ngrx-poly/test/chain/find-all`)
  })

  it('should throw if path is empty', () => {
    const e = new Error('createActionType() should have at least one argument to `path`.')
    expect(() => createActionType(Op.FIND_ALL, null, '')).toThrow(e)
    expect(() => createActionType(Op.FIND_ALL)).toThrow(e)
  })
})
