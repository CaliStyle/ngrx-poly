import { Action, ActionCreator } from '@ngrx/store'
import { FunctionWithParametersType } from '@ngrx/store/src/models'
import { Observable } from 'rxjs'

export interface EffectsMapD1 {
  findAll: Observable<Action>
  search: Observable<Action>
  findOne: Observable<Action>
  create: Observable<Action>
  update: Observable<Action>
  delete: Observable<Action>
  setOnErrorEffect: (
    fn: (error: any) => any,
    dispatch?: boolean,
    ...additionalActions: (string | ActionCreator<string, FunctionWithParametersType<any[], object>>)[]
  ) => Observable<any>
}

export interface EffectsMapD2 {
  findAll: Observable<Action>
  search: Observable<Action>
  findOne: Observable<Action>
  createAndAdd: Observable<Action>
  addOne: Observable<Action>
  addMany: Observable<Action>
  remove: Observable<Action>
  setOnErrorEffect: (
    fn: (error: any) => any,
    dispatch?: boolean,
    ...additionalActions: (string | ActionCreator<string, FunctionWithParametersType<any[], object>>)[]
  ) => Observable<any>
}
