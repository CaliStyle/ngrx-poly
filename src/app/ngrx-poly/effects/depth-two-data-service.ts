import { Observable } from 'rxjs'
import { List } from '../types/list'

export interface DepthTwoDataServiceBase<T, U> {
  findAll?(parent: T, query: any): Observable<List<U>>
  search?(parent: T, query: any): Observable<List<U>>
  findOne?(parent: T, id: string | number): Observable<U>
  createAndAdd?(parent: T, obj: U): Observable<U>
  addOne?(parent: T, obj: U): Observable<U>
  addMany?(parent: T, objs: U[]): Observable<List<U>>
  update?(parent: T, obj: U): Observable<U>
  remove?(parent: T, id: string | number): Observable<U>
}
