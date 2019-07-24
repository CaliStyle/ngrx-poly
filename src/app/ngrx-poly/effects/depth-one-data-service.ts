import { Observable } from 'rxjs'
import { List } from '../types/list'

export interface DepthOneDataServiceBase<T> {
  findAll?(query: any): Observable<List<T>>
  search?(query: any): Observable<List<T>>
  findOne?(id: string | number): Observable<T>
  create?(obj: T): Observable<T>
  update?(obj: T): Observable<T>
  delete?(id: string | number): Observable<T>
}
