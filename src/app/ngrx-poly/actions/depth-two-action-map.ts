import { createAction, props } from '@ngrx/store'
import { List } from '../types/list'
import { Query } from '../types/query'
import { ActionMapD2 } from './action-map'
import { createActionType } from './create-action-type'
import { mapObjToPayloadD1 } from './depth-one-action-map'
import { Op } from './ops'

export function depthTwo(feature: string) {
  return <T, U, Tkey extends string, Ukey extends string>(parent: Tkey, entity: Ukey): ActionMapD2<T, U, Tkey, Ukey> => {
    return {
      findAll: createAction(
        createActionType(Op.FIND_ALL, feature, parent, entity),
        (parentItem: T, query: Query) =>
          ({
            [parent]: parentItem,
            query,
          } as any)
      ),
      findAllSuccess: createAction(createActionType(Op.FIND_ALL_SUCCESS, feature, parent, entity), props<List<U>>()),
      findAllFailure: createAction(createActionType(Op.FIND_ALL_FAILURE, feature, parent, entity), (error: any) => ({ error })),

      search: createAction(
        createActionType(Op.SEARCH, feature, parent, entity),
        (parentItem: T, query: Query) => ({ [parent]: parentItem, query } as any)
      ),
      searchSuccess: createAction(createActionType(Op.SEARCH_SUCCESS, feature, parent, entity), props<List<U>>()),
      searchFailure: createAction(createActionType(Op.SEARCH_FAILURE, feature, parent, entity), (error: any) => ({ error })),

      findOne: createAction(
        createActionType(Op.FIND_ONE, feature, parent, entity),
        (parentItem: T, id: string | number) =>
          ({
            [parent]: parentItem,
            id,
          } as any)
      ),
      findOneSuccess: createAction(createActionType(Op.FIND_ONE_SUCCESS, feature, parent, entity), (item: U) =>
        mapObjToPayloadD1(entity, item)
      ),
      findOneFailure: createAction(createActionType(Op.FIND_ONE_FAILURE, feature, parent, entity), (error: any) => ({ error })),

      addOne: createAction(createActionType(Op.ADD_ONE, feature, parent, entity), (parentItem: T, item: U) =>
        mapObjToPayloadD2(parent, entity, parentItem, item)
      ),
      addOneSuccess: createAction(createActionType(Op.ADD_ONE_SUCCESS, feature, parent, entity), (item: U) =>
        mapObjToPayloadD1(entity, item)
      ),
      addOneFailure: createAction(createActionType(Op.ADD_ONE_FAILURE, feature, parent, entity), (error: any) => ({ error })),

      addMany: createAction(createActionType(Op.ADD_MANY, feature, parent, entity), (parentItem: T, items: U[]) =>
        mapObjToPayloadD2(parent, entity, parentItem, items)
      ),
      addManySuccess: createAction(createActionType(Op.ADD_MANY_SUCCESS, feature, parent, entity), props<List<U>>()
      ),
      addManyFailure: createAction(createActionType(Op.ADD_MANY_FAILURE, feature, parent, entity), (error: any) => ({ error })),


      createAndAdd: createAction(createActionType(Op.CREATE_AND_ADD, feature, parent, entity), (parentItem: T, item: U) =>
        mapObjToPayloadD2(parent, entity, parentItem, item)
      ),
      createAndAddSuccess: createAction(createActionType(Op.CREATE_AND_ADD_SUCCESS, feature, parent, entity), (item: U) =>
        mapObjToPayloadD1(entity, item)
      ),
      createAndAddFailure: createAction(createActionType(Op.CREATE_AND_ADD_FAILURE, feature, parent, entity), (error: any) => ({ error })),

      remove: createAction(
        createActionType(Op.REMOVE, feature, parent, entity),
        (parentItem: T, id: string | number) =>
          ({
            [parent]: parentItem,
            id,
          } as any)
      ),
      removeSuccess: createAction(createActionType(Op.REMOVE_SUCCESS, feature, parent, entity), (item: U) =>
        mapObjToPayloadD1(entity, item)
      ),
      removeFailure: createAction(createActionType(Op.REMOVE_FAILURE, feature, parent, entity), (error: any) => ({ error })),

      // select: createAction(createActionType(Op.SELECT, feature, parent, entity), (id: string | number) => ({ id })),
      // deselect: createAction(createActionType(Op.DESELECT, feature, parent, entity)),

      _parent: parent,
      _entity: entity,
    }
  }
}

function mapObjToPayloadD2<T, U, Tkey extends string, Ukey extends string>(parent: Tkey, entity: Ukey, parentItem: T, item: U) {
  return {
    [parent]: parentItem,
    [entity]: item,
  } as any
}
