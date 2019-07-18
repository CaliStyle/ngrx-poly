import { createAction, on } from '@ngrx/store'
import { createRootActionMap } from '../actions/create-action-map'
import { depthTwoReducerCreator } from './depth-two-reducer'
import { defaultInitialState } from './state'

interface U {
  uid: string
}

interface C {
  id: string
}

const demoUser: U = {
  uid: 'test-id',
}

const demoCustomer: C = {
  id: 'customer-test-id',
}

describe('DepthTwo Reducer', () => {
  const actionMap = createRootActionMap().depthTwo<U, C, 'user', 'customer'>('user', 'customer')
  const customAction = createAction('myCustomAction')
  const reducer = depthTwoReducerCreator(
    actionMap,
    entity => entity.id,
    on(customAction, s => ({ ...s, selectedId: 'custom-action-test' }))
  )
  const state = defaultInitialState

  it('should reduce findAll', () => {
    expect(reducer(state, actionMap.findAll(demoUser, {}))).toEqual({
      entities: {},
      ids: [],

      loaded: false,
      loading: true,

      selectedId: null,

      total: 0,
      offset: 0,
      limit: 0,
      page: 0,
      pages: 0,
      filter: [],
      sort: [[]],
      includes: null,
      error: null,
    })
  })

  it('should reduce search', () => {
    expect(reducer(state, actionMap.search(demoUser, {}))).toEqual({
      entities: {},
      ids: [],

      loaded: false,
      loading: true,

      selectedId: null,

      total: 0,
      offset: 0,
      limit: 0,
      page: 0,
      pages: 0,
      filter: [],
      sort: [[]],
      includes: null,
      error: null,
    })
  })

  it('should reduce findOne', () => {
    expect(reducer(state, actionMap.findOne(demoUser, 'customer-test-id'))).toEqual({
      entities: {},
      ids: [],

      loaded: false,
      loading: true,

      selectedId: null,

      total: 0,
      offset: 0,
      limit: 0,
      page: 0,
      pages: 0,
      filter: [],
      sort: [[]],
      includes: null,
      error: null,
    })
  })

  it('should reduce create', () => {
    expect(reducer(state, actionMap.create(demoUser, demoCustomer))).toEqual({
      entities: {},
      ids: [],

      loaded: false,
      loading: true,

      selectedId: null,

      total: 0,
      offset: 0,
      limit: 0,
      page: 0,
      pages: 0,
      filter: [],
      sort: [[]],
      includes: null,
      error: null,
    })
  })

  it('should reduce update', () => {
    expect(reducer(state, actionMap.update(demoUser, demoCustomer))).toEqual({
      entities: {},
      ids: [],

      loaded: false,
      loading: true,

      selectedId: null,

      total: 0,
      offset: 0,
      limit: 0,
      page: 0,
      pages: 0,
      filter: [],
      sort: [[]],
      includes: null,
      error: null,
    })
  })

  it('should reduce delete', () => {
    expect(reducer(state, actionMap.delete(demoUser, 'customer-test-user'))).toEqual({
      entities: {},
      ids: [],

      loaded: false,
      loading: true,

      selectedId: null,

      total: 0,
      offset: 0,
      limit: 0,
      page: 0,
      pages: 0,
      filter: [],
      sort: [[]],
      includes: null,
      error: null,
    })
  })

  it('should reduce findAllSuccess', () => {
    expect(
      reducer(
        state,
        actionMap.findAllSuccess({
          rows: [demoCustomer],
          pagination: {
            total: 1,
            pages: 1,
            page: 1,
            limit: 1,
            offset: 0,
            filter: null,
            sort: [['id', 'asc']],
          },
        })
      )
    ).toEqual({
      entities: { 'customer-test-id': demoCustomer },
      ids: ['customer-test-id'],

      loaded: true,
      loading: false,

      selectedId: null,

      total: 1,
      pages: 1,
      page: 1,
      limit: 1,
      offset: 0,
      filter: null,
      sort: [['id', 'asc']],
      includes: null,
      error: null,
    })
  })

  it('should reduce searchSuccess', () => {
    expect(
      reducer(
        state,
        actionMap.searchSuccess({
          rows: [demoCustomer],
          pagination: {
            total: 1,
            pages: 1,
            page: 1,
            limit: 1,
            offset: 0,
            filter: null,
            sort: [['id', 'asc']],
            term: 'test',
          },
        })
      )
    ).toEqual({
      entities: { 'customer-test-id': demoCustomer },
      ids: ['customer-test-id'],

      loaded: true,
      loading: false,

      selectedId: null,

      total: 1,
      pages: 1,
      page: 1,
      limit: 1,
      offset: 0,
      filter: null,
      sort: [['id', 'asc']],
      includes: null,
      error: null,
    })
  })

  it('should reduce findOneSuccess', () => {
    expect(reducer(state, actionMap.findOneSuccess(demoCustomer))).toEqual({
      entities: { 'customer-test-id': demoCustomer },
      ids: ['customer-test-id'],

      loaded: true,
      loading: false,

      selectedId: 'customer-test-id',

      total: 0,
      pages: 0,
      page: 0,
      limit: 0,
      offset: 0,
      filter: [],
      sort: [[]],
      includes: null,
      error: null,
    })
  })

  it('should reduce createSuccess', () => {
    expect(reducer(state, actionMap.createSuccess(demoCustomer))).toEqual({
      entities: { 'customer-test-id': demoCustomer },
      ids: ['customer-test-id'],

      loaded: true,
      loading: false,

      selectedId: 'customer-test-id',

      total: 0,
      pages: 0,
      page: 0,
      limit: 0,
      offset: 0,
      filter: [],
      sort: [[]],
      includes: null,
      error: null,
    })
  })

  it('should reduce updateSuccess', () => {
    expect(reducer(state, actionMap.updateSuccess(demoCustomer))).toEqual({
      entities: { 'customer-test-id': demoCustomer },
      ids: ['customer-test-id'],

      loaded: true,
      loading: false,

      selectedId: 'customer-test-id',

      total: 0,
      pages: 0,
      page: 0,
      limit: 0,
      offset: 0,
      filter: [],
      sort: [[]],
      includes: null,
      error: null,
    })
  })

  it('should reduce deleteSuccess', () => {
    expect(
      reducer(
        {
          entities: { 'customer-test-id': demoCustomer },
          ids: ['customer-test-id'],

          loaded: true,
          loading: false,

          selectedId: null,

          total: 1,
          pages: 1,
          page: 1,
          limit: 1,
          offset: 0,
          filter: null,
          sort: [['id', 'asc']],
          includes: null,
          error: null,
        },
        actionMap.deleteSuccess(demoCustomer)
      )
    ).toEqual({
      entities: {},
      ids: [],

      loaded: true,
      loading: false,

      selectedId: null,

      total: 1,
      pages: 1,
      page: 1,
      limit: 1,
      offset: 0,
      filter: null,
      sort: [['id', 'asc']],
      includes: null,
      error: null,
    })
  })

  it('should reduce deleteSuccess and remove selected id', () => {
    expect(
      reducer(
        {
          entities: { 'customer-test-id': demoCustomer },
          ids: ['customer-test-id'],

          loaded: true,
          loading: false,

          selectedId: 'customer-test-id',

          total: 1,
          pages: 1,
          page: 1,
          limit: 1,
          offset: 0,
          filter: null,
          sort: [['id', 'asc']],
          includes: null,
          error: null,
        },
        actionMap.deleteSuccess(demoCustomer)
      )
    ).toEqual({
      entities: {},
      ids: [],

      loaded: true,
      loading: false,

      selectedId: null,

      total: 1,
      pages: 1,
      page: 1,
      limit: 1,
      offset: 0,
      filter: null,
      sort: [['id', 'asc']],
      includes: null,
      error: null,
    })
  })

  it('should reduce deleteSuccess and not touch unrelated selected id', () => {
    expect(
      reducer(
        {
          entities: { 'customer-test-id': demoCustomer },
          ids: ['customer-test-id'],

          loaded: true,
          loading: false,

          selectedId: 'other-test-id',

          total: 1,
          pages: 1,
          page: 1,
          limit: 1,
          offset: 0,
          filter: null,
          sort: [['id', 'asc']],
          includes: null,
          error: null,
        },
        actionMap.deleteSuccess(demoCustomer)
      )
    ).toEqual({
      entities: {},
      ids: [],

      loaded: true,
      loading: false,

      selectedId: 'other-test-id',

      total: 1,
      pages: 1,
      page: 1,
      limit: 1,
      offset: 0,
      filter: null,
      sort: [['id', 'asc']],
      includes: null,
      error: null,
    })
  })

  it('should reduce failure actions', () => {
    const errorState = {
      entities: {},
      ids: [],

      loaded: true,
      loading: false,

      selectedId: null,

      total: 0,
      pages: 0,
      page: 0,
      limit: 0,
      offset: 0,
      filter: [],
      sort: [[]],
      includes: null,
      error: { message: 'error message' },
    }
    const error = { message: 'error message' }

    expect(reducer(state, actionMap.findAllFailure(error))).toEqual(errorState)
    expect(reducer(state, actionMap.searchFailure(error))).toEqual(errorState)
    expect(reducer(state, actionMap.findOneFailure(error))).toEqual(errorState)
    expect(reducer(state, actionMap.createFailure(error))).toEqual(errorState)
    expect(reducer(state, actionMap.updateFailure(error))).toEqual(errorState)
    expect(reducer(state, actionMap.deleteFailure(error))).toEqual(errorState)
  })

  it('should allow for custom on handling', () => {
    expect(reducer(state, customAction())).toEqual({
      entities: {},
      ids: [],

      loaded: true,
      loading: false,

      selectedId: 'custom-action-test',

      total: 0,
      pages: 0,
      page: 0,
      limit: 0,
      offset: 0,
      filter: [],
      sort: [[]],
      includes: null,
      error: null,
    })
  })
})
