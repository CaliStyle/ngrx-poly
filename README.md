# ngrx-poly

[![npm](https://img.shields.io/npm/v/ngrx-poly.svg)](https://www.npmjs.com/package/ngrx-poly)
[![npm](https://img.shields.io/npm/dm/ngrx-poly.svg)](https://www.npmjs.com/ngrx-poly)
[![Build status][ci-image]][ci-url]
[![Maintenance](https://img.shields.io/maintenance/yes/2019.svg)]()

ngrx-poly is a set of utilities for reducing boilerplate when working with NgRx. Everything is created with factories and generics, reducing thousands of lines of action, effect, and reducer code. Best of all, it's extendable - you can add your own actions, effects, and reducer calls just like you'd expect to be able to.

### Installation

This package is on NPM, so just run

```sh
$ npm install ngrx-poly@latest --save
```

### Usage

There are several steps to implement ngrx-poly into your app.

#### Actions

Out of the box, ngrx-poly supports the following action types (depending on the entity "depth"):

_All Entities_:

- findAll
- search
- findOne
- update

_Depth 1_:

- create
- delete

_Depth 2_:

- addOne
- addMany
- createAndAdd
- remove

To create these actions, you first need to make an action entry point, in `/{feature root folder}/store/actions/actions.ts`. Its sole job is to be the one source of truth for that feature's actions.

```ts
// store/actions/actions.ts
import { createActionMap } from 'ngrx-poly'

// Name this something specific and unique to the pack
export const createVendorsActions = createActionMap('vendors') // substitute in the name of the feature, PLURAL
```

Then, for each of your entities, you can use that creator to make an object map of the actions listed above:

Depth 1 example:

```ts
// store/actions/vendors.ts
import { Vendor } from '../../models/Vendor'
import { createVendorsActions } from './actions'

export const vendorsActions = createVendorsActions.depthOne<Vendor, 'vendor'>('vendor') // SINGULAR name of the entity
```

Depth 2 example:

```ts
// store/actions/vendor-events.ts
import { Vendor } from '../../models/Vendor'
import { VendorEvent } from '../../models/VendorEvent'
import { createVendorsActions } from './actions'

export const vendorEventsActions = createVendorsActions.depthTwo<Vendor, VendorEvent, 'vendor', 'event'>('vendor', 'event') // SINGULAR name of both entities
```

If you want to extend these maps with your own actions, you can use the spread operator to export your own actions:

```ts
const addTag = createAction('vendors/vendor/add-tag', (vendor: Vendor, tag: string) => ({ vendor, tag }))
// ...

export const vendorsActions = {
  ...createVendorsActions.depthOne<Vendor, 'vendor'>('vendor'),
  addTag,
  // ...
}
```

#### Effects

Including the associated side effects in your app is as simple as adding one line.

```ts
import { EffectCreators } from 'ngrx-poly'
import { APIService } from '../../controllers/vendors.controller'
import { vendorsActions } from '../actions/vendors' // or wherever those actions are available

@Injectable()
export class VendorsEffects {
  effects = EffectCreators.createDepthOneEffects(vendorsActions, this.actions$, this.apiService)

  create$ = this.effects.create
  update$ = this.effects.update
  findOne$ = this.effects.findOne
  search$ = this.effects.search
  delete$ = this.effects.delete
  findAll$ = this.effects.findAll

  onError$ = this.effects.setOnErrorEffect((error: any) => /* error handler */)

  constructor(
    private apiService: APIService,
    private actions$: Actions,
  ) {}

  // Listen for the 'Vendor Add Tag' actions
  vendorAddTag$: Observable<Action> = createEffect(() =>
    this.actions$.pipe(
      ofType(vendorsActions.addTag),
      switchMap(action =>
        this.apiService.addTag(action).pipe(
          map(vendorEntity => vendorsActions.addTagSuccess(vendorEntity)),
          catchError(err => of(vendorsActions.addTagFailure({ error: err })))
        )
      )
    )
  )
}
```

However, this code depends on the API Service being well typed. Out of the box, ngrx-poly includes interfaces called `DepthOneDataServiceBase<T>` and `DepthOneDataServiceBase<T, U>` that will help you conform your data service to a type that ngrx-poly can consume. Here are the structures of those interfaces:

```ts
export interface List<T> {
  rows: T[]
  pagination: {
    total: number
    pages: number
    page: number
    limit: number
    offset: number
    filter: any
    sort: [string[]]
    term?: string
  }
}

export interface DepthOneDataServiceBase<T> {
  findAll?(query: any): Observable<List<T>>
  search?(query: any): Observable<List<T>>
  findOne?(id: string | number): Observable<T>
  create?(obj: T): Observable<T>
  update?(obj: T): Observable<T>
  delete?(id: string | number): Observable<T>
}

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
```

It is encouraged that developers use a different data service for each entity type.

#### Reducers

Any logic that handled the aformentioned actions can be removed from the code and replaced with ngrx-poly's reducer. The reducer takes your action map from before, as well as a function that will select the sortable key (i.e. ID) from your data structure.

```ts
const vendorsReducer = ReducerCreators.createDepthOneReducer(vendorsActions, vendor => vendor.vendor_uuid)
```

To add your own functions to this reducer, such as to handle other actions, you can include additional `on`s:

```ts
const vendorsReducer = ReducerCreators.createDepthOneReducer(
  vendorsActions,
  vendor => vendor.vendor_uuid,
  on(vendorsActions.addTag, (state, payload) => ({
    ...state,
    loaded: false,
    loading: true,
  }))
)
```

Additionally, to help with AoT compilation, you're encouraged to wrap this reducer in another function, like this:

```ts
export function reducer(state: PolyState<Vendor>, action: Action): PolyState<Vendor> {
  return vendorsReducer(state, action)
}
```

Initial state objects, `State` interfaces, and selectors can all be removed because ngrx-poly has generic versions. Since it uses NgRx 8, exported initial states are obselete, and handled internally by ngrx-poly. The `State` interface has been generalized to `PolyState<T>` where `T` is the deepest entity of the reducer slice (in other words, if you're working with Vendor Events, the `VendorEvent` would be `T`, not `Vendor`). Finally, as we'll see in the next section, selectors can be removed in favor of ngrx-poly's generic selectors.

**NOTE**: Be sure to include your reducer in the feature's main reducer file. To keep it well typed, you can associate it with `PolyState<T>` in your `State` interface.

#### Selectors

Selectors for an ngrx-poly slice can be reduced down to one line:

```ts
export const vendors = createSelectors(
  getVendorsState, // the feature selector for this feature
  (state: State) => state.vendors // `State` is your feature state interface
)
```

This will expose the following selectors:

- `getState` — get the whole state object
- `getAll` — get all entities as an array
- `getLoaded` — get if the data is loaded
- `getLoading` — get if the data is loading
- `getPagination` — get the pagination object
- `getEntities` — get an object map of entities
- `getSelected` — get the selected entity
- `getError` — get the error from the last action

By default, you can use the `select` action from the action map to select an entity. Alternatively, you can include your own selector to get a selected ID (such as from your router store) as the third argument:

```ts
export const vendors = createSelectors(getVendorsState, (state: State) => state.vendors, fromCore.getSelectedRouteId)
```

#### That's it!

Now you have ngrx-poly implemented in your application.

### Development

To run live testing: `ng test`

To run tests: `npm test`

To run distribution: `npm run build:dist`

To publish `npm run build:dist && npm publish dist`

[ci-image]: https://img.shields.io/circleci/project/github/CaliStyle/ngrx-poly/master.svg
[ci-url]: https://circleci.com/gh/CaliStyle/ngrx-poly/tree/master
