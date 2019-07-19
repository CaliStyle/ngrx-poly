import { Actions, createEffect, ofType } from '@ngrx/effects'
import { of } from 'rxjs'
import { catchError, map, mergeMap } from 'rxjs/operators'
import { ActionMapD2 } from '../actions/action-map'
import { DepthTwoDataServiceBase } from './depth-two-data-service'
import { EffectsMapD2 } from './effects-map'

export function depthTwoEffectCreators<T, U, Tkey extends string, Ukey extends string>(
  actionMap: ActionMapD2<T, U, Tkey, Ukey>,
  actions$: Actions,
  dataService: DepthTwoDataServiceBase<T, U>
): EffectsMapD2 {
  return {
    findAll: createEffect(() =>
      actions$.pipe(
        ofType(actionMap.findAll),
        mergeMap(action => {
          try {
            const parent = (action[actionMap._parent] as unknown) as T
            return dataService.findAll(parent, action.query).pipe(
              map(data => actionMap.findAllSuccess(data)),
              catchError(error => of(actionMap.findAllFailure(error)))
            )
          } catch (e) {
            return of(actionMap.findAllFailure(e))
          }
        })
      )
    ),

    search: createEffect(() =>
      actions$.pipe(
        ofType(actionMap.search),
        mergeMap(action => {
          try {
            const parent = (action[actionMap._parent] as unknown) as T
            return dataService.search(parent, action.query).pipe(
              map(data => actionMap.searchSuccess(data)),
              catchError(error => of(actionMap.searchFailure(error)))
            )
          } catch (e) {
            return of(actionMap.searchFailure(e))
          }
        })
      )
    ),

    findOne: createEffect(() =>
      actions$.pipe(
        ofType(actionMap.findOne),
        mergeMap(action => {
          try {
            const parent = (action[actionMap._parent] as unknown) as T
            return dataService.findOne(parent, action.id).pipe(
              map(data => actionMap.findOneSuccess(data)),
              catchError(error => of(actionMap.findOneFailure(error)))
            )
          } catch (e) {
            return of(actionMap.findOneFailure(e))
          }
        })
      )
    ),

    createAndAdd: createEffect(() =>
      actions$.pipe(
        ofType(actionMap.createAndAdd),
        mergeMap(action => {
          try {
            const parent = (action[actionMap._parent] as unknown) as T
            const entity = (action[actionMap._entity] as unknown) as U
            return dataService.createAndAdd(parent, entity).pipe(
              map(data => actionMap.createAndAddSuccess(data)),
              catchError(error => of(actionMap.createAndAddFailure(error)))
            )
          } catch (e) {
            return of(actionMap.createAndAddFailure(e))
          }
        })
      )
    ),

    addOne: createEffect(() =>
      actions$.pipe(
        ofType(actionMap.addOne),
        mergeMap(action => {
          try {
            const parent = (action[actionMap._parent] as unknown) as T
            const entity = (action[actionMap._entity] as unknown) as U
            return dataService.addOne(parent, entity).pipe(
              map(data => actionMap.addOneSuccess(data)),
              catchError(error => of(actionMap.addOneFailure(error)))
            )
          } catch (e) {
            return of(actionMap.addOneFailure(e))
          }
        })
      )
    ),

    addMany: createEffect(() =>
      actions$.pipe(
        ofType(actionMap.addMany),
        mergeMap(action => {
          try {
            const parent = (action[actionMap._parent] as unknown) as T
            const entity = (action[actionMap._entity] as unknown) as U[]
            return dataService.addMany(parent, entity).pipe(
              map(data => actionMap.addManySuccess(data)),
              catchError(error => of(actionMap.addManyFailure(error)))
            )
          } catch (e) {
            return of(actionMap.addManyFailure(e))
          }
        })
      )
    ),

    remove: createEffect(() =>
      actions$.pipe(
        ofType(actionMap.remove),
        mergeMap(action => {
          try {
            const parent = (action[actionMap._parent] as unknown) as T
            return dataService.remove(parent, action.id).pipe(
              map(data => actionMap.removeSuccess(data)),
              catchError(error => of(actionMap.removeFailure(error)))
            )
          } catch (e) {
            return of(actionMap.removeFailure(e))
          }
        })
      )
    ),
  }
}
