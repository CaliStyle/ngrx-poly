import { MemoizedSelector, Selector } from '@ngrx/store'
import { Pagination } from '../types/pagination'
import { KeyMap } from '../types/keymap'
import { PolyState } from '../reducers/state'

export interface SelectorMap<T> {
  getState: MemoizedSelector<object, PolyState<T>> | Selector<any, PolyState<T>>
  getAll: MemoizedSelector<object, T[]>
  getLoaded: MemoizedSelector<object, boolean>
  getLoading: MemoizedSelector<object, boolean>
  getPagination: MemoizedSelector<object, Pagination>
  getEntities: MemoizedSelector<object, KeyMap<T>>
  getSelected: MemoizedSelector<object, T>
  getError: MemoizedSelector<object, any>
}
