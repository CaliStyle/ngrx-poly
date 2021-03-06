import { MemoizedSelector, createSelector, Selector } from '@ngrx/store'
import { PolyState } from '../reducers/state'
import { KeyMap } from '../types/keymap'
import { SelectorMap } from './selectors-map'

const getLoaded = <T>(state: PolyState<T>) => state.loaded
const getLoading = <T>(state: PolyState<T>) => state.loading
const getIds = <T>(state: PolyState<T>) => state.ids
const getEntities = <T>(state: PolyState<T>) => state.entities
const getSelectedId = <T>(state: PolyState<T>) => state.selectedId

/** Pagination */
const getPagination = <T>(state: PolyState<T>) => ({
  total: state.total,
  limit: state.limit,
  offset: state.offset,
  page: state.page,
  pages: state.pages,
  sort: state.sort,
  includes: state.includes,
  filter: state.filter,
})

/** Get All Users */
const getAll = <T>() =>
  createSelector(
    getEntities,
    getIds,
    (entities: KeyMap<T>, ids: string[]) => ids.map(id => entities[id] as T)
  )

export function createSelectors<T, State>(
  featureSelector: MemoizedSelector<object, any>,
  sliceSelector: (state: State) => PolyState<T>,
  selectedIdSelector?: MemoizedSelector<any, string | number> | Selector<PolyState<T>, string | number>
): SelectorMap<T> {
  const getState = createSelector<object, any, PolyState<T>>(
    featureSelector,
    sliceSelector
  )

  return baseCreateSelectors(getState, selectedIdSelector)
}

export function createRootSelectors<T, State>(
  sliceSelector: (state: State) => PolyState<T>,
  selectedIdSelector?: MemoizedSelector<any, string | number> | Selector<PolyState<T>, string | number>
): SelectorMap<T> {
  return baseCreateSelectors(sliceSelector, selectedIdSelector)
}

function baseCreateSelectors<T>(
  getState: MemoizedSelector<any, PolyState<T>> | ((state: any) => PolyState<T>),
  selectedIdSelector?: MemoizedSelector<any, string | number> | Selector<PolyState<T>, string | number>
): SelectorMap<T> {
  let getSelected

  const getStateEntities = createSelector(
    getState,
    getEntities
  )

  if (selectedIdSelector) {
    getSelected = createSelector(
      getStateEntities,
      selectedIdSelector,
      (entities, selectedId) => entities[selectedId]
    )
  } else {
    const getStateSelectedId = createSelector(
      getState,
      getSelectedId
    )
    getSelected = createSelector(
      getStateEntities,
      getStateSelectedId,
      (entities, selectedId) => entities[selectedId]
    )
  }

  return {
    getState,
    getAll: createSelector(
      getState,
      getAll<T>()
    ),
    getLoaded: createSelector(
      getState,
      getLoaded
    ),
    getLoading: createSelector(
      getState,
      getLoading
    ),
    getPagination: createSelector(
      getState,
      getPagination
    ),
    getError: createSelector(
      getState,
      state => state.error
    ),
    getEntities: getStateEntities,
    getSelected: getSelected,
  }
}
