import { createReducer, on } from '@ngrx/store'
import { On } from '@ngrx/store/src/reducer_creator'
import { ActionMapD2 } from '../actions/action-map'
import { reduceEntityArray } from '../utils/reduce-entity-array'
import { defaultInitialState, PolyState } from './state'
import { removeFromArray, removeFromObj } from './utils'

export function depthTwoReducerCreator<T extends object, U extends object, Tkey extends string, Ukey extends string>(
  actionMap: ActionMapD2<T, U, Tkey, Ukey>,
  keyGetter: (entity: U) => string | number,
  ...ons: On<PolyState<U>>[]
) {
  const entity = actionMap._entity
  return createReducer<PolyState<U>>(
    defaultInitialState,
    on(
      actionMap.findAll,
      actionMap.search,
      actionMap.findOne,
      actionMap.createAndAdd,
      actionMap.addOne,
      actionMap.addMany,
      actionMap.update,
      actionMap.remove,
      state => ({
        ...state,
        loaded: false,
        loading: true,
      })
    ),
    on(actionMap.findAllSuccess, actionMap.searchSuccess, (state, action) => {
      const rows: U[] = action.rows
      const pagination = action.pagination

      const { entities, ids } = reduceEntityArray(rows, keyGetter)

      return {
        ...state,
        ids,
        entities,
        loaded: true,
        loading: false,
        total: pagination.total,
        offset: pagination.offset,
        limit: pagination.limit,
        page: pagination.page,
        pages: pagination.pages,
        filter: pagination.filter,
        sort: pagination.sort,
      }
    }),
    on(actionMap.findOneSuccess, actionMap.createAndAddSuccess, actionMap.addOneSuccess, actionMap.updateSuccess, (state, payload) => {
      const newEntity = (payload[entity] as unknown) as U
      const selectedId = keyGetter(newEntity)

      const entities = { ...state.entities, [selectedId]: newEntity }
      const ids = [...state.ids, selectedId]

      return {
        ...state,
        ids,
        entities,
        selectedId,
        loaded: true,
        loading: false,
      }
    }),
    on(actionMap.addManySuccess, (state, payload) => {
      const newEntities = payload.rows

      const { entities, ids } = reduceEntityArray(newEntities, keyGetter, state.entities)

      return {
        ...state,
        ids,
        entities,
        loaded: true,
        loading: false,
      }
    }),
    on(actionMap.removeSuccess, (state, payload) => {
      const entityToRemove = (payload[entity] as unknown) as U
      const idToRemove = keyGetter(entityToRemove)

      const entities = removeFromObj(state.entities, idToRemove)
      const ids = removeFromArray(state.ids, idToRemove)

      const mergeObj: Partial<PolyState<T>> = {}
      if (state.selectedId === idToRemove) {
        mergeObj.selectedId = null
      }

      return {
        ...state,
        ...mergeObj,
        ids,
        entities,
        loaded: true,
        loading: false,
      }
    }),
    on(
      actionMap.findAllFailure,
      actionMap.searchFailure,
      actionMap.findOneFailure,
      actionMap.createAndAddFailure,
      actionMap.addOneFailure,
      actionMap.addManyFailure,
      actionMap.updateFailure,
      actionMap.removeFailure,
      (state, payload) => ({
        ...state,
        error: payload.error,
        loaded: true,
        loading: false,
      })
    ),
    // on(actionMap.select, (state, payload) => ({
    //   ...state,
    //   selectedId: payload.id,
    // })),
    // on(actionMap.deselect, state => ({
    //   ...state,
    //   selectedId: null,
    // })),
    ...ons
  )
}
