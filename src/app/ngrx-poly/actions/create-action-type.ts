import { Op } from './ops'

export function createActionType(operation: Op, ...path: string[]) {
  path = path.filter(item => !!item)
  if (path.length === 0) {
    throw new Error('createActionType() should have at least one argument to `path`.')
  }
  return `ngrx-poly/${path.join('/')}/${operation}`
}
