import { Observable } from 'rxjs'
import { List } from '../types/list'

export abstract class DepthTwoDataServiceBase<T, U> {
  abstract findAll(parent: T, query: any): Observable<List<U>>
  abstract search(parent: T, query: any): Observable<List<U>>
  abstract findOne(parent: T, id: string | number): Observable<U>
  abstract createAndAdd(parent: T, obj: U): Observable<U>
  abstract addOne(parent: T, obj: U): Observable<U>
  abstract addMany(parent: T, objs: U[]): Observable<List<U>>
  abstract remove(parent: T, id: string | number): Observable<U>
}
