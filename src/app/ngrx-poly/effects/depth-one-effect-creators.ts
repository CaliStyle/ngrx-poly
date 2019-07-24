import { Actions, createEffect, ofType } from '@ngrx/effects'
import { of } from 'rxjs'
import { catchError, map, mergeMap, switchMap } from 'rxjs/operators'
import { ActionMapD1 } from '../actions/action-map'
import { DepthOneDataServiceBase } from './depth-one-data-service'
import { EffectsMapD1 } from './effects-map'
import { Action, ActionCreator } from '@ngrx/store'
import { FunctionWithParametersType } from '@ngrx/store/src/models'

export function depthOneEffectCreators<T, U extends string>(
  actionMap: ActionMapD1<T, U>,
  actions$: Actions,
  dataService: DepthOneDataServiceBase<T>
): EffectsMapD1 {
  return {
    findAll: createEffect(() =>
      actions$.pipe(
        ofType(actionMap.findAll),
        mergeMap(action => {
          try {
            return dataService.findAll(action.query).pipe(
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
            return dataService.search(action.query).pipe(
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
            return dataService.findOne(action.id).pipe(
              map(data => actionMap.findOneSuccess(data)),
              catchError(error => of(actionMap.findOneFailure(error)))
            )
          } catch (e) {
            return of(actionMap.findOneFailure(e))
          }
        })
      )
    ),

    create: createEffect(() =>
      actions$.pipe(
        ofType(actionMap.create),
        switchMap(action => {
          try {
            const entity = (action[actionMap._entity] as unknown) as T
            return dataService.create(entity).pipe(
              map(data => actionMap.createSuccess(data as T)),
              catchError(error => of(actionMap.createFailure(error)))
            )
          } catch (e) {
            return of(actionMap.createFailure(e))
          }
        })
      )
    ),

    update: createEffect(() =>
      actions$.pipe(
        ofType(actionMap.update),
        mergeMap(action => {
          try {
            const entity = (action[actionMap._entity] as unknown) as T
            return dataService.update(entity).pipe(
              map(data => actionMap.updateSuccess(data)),
              catchError(error => of(actionMap.updateFailure(error)))
            )
          } catch (e) {
            return of(actionMap.updateFailure(e))
          }
        })
      )
    ),

    delete: createEffect(() =>
      actions$.pipe(
        ofType(actionMap.delete),
        mergeMap(action => {
          try {
            return dataService.delete(action.id).pipe(
              map(data => actionMap.deleteSuccess(data)),
              catchError(error => of(actionMap.deleteFailure(error)))
            )
          } catch (e) {
            return of(actionMap.deleteFailure(e))
          }
        })
      )
    ),
    setOnErrorEffect: function(
      onError: () => any,
      dispatch: boolean = true,
      ...additionalActions: (string | ActionCreator<string, FunctionWithParametersType<any[], object>>)[]
    ) {
      return createEffect(
        () =>
          actions$.pipe(
            ofType(
              actionMap.findAllFailure,
              actionMap.searchFailure,
              actionMap.findOneFailure,
              actionMap.createFailure,
              actionMap.updateFailure,
              actionMap.deleteFailure,
              ...additionalActions
            ),
            map(onError)
          ),
        { dispatch }
      )
    },
  }
}
