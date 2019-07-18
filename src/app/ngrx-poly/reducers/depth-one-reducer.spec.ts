import { createAction, on } from '@ngrx/store'
import { createRootActionMap } from '../actions/create-action-map'
import { depthOneReducerCreator } from './depth-one-reducer'
import { defaultInitialState } from './state'

const demoUser = {
  id: 'test-id',
}

describe('DepthOne Reducer', () => {
  const actionMap = createRootActionMap().depthOne<any, 'user'>('user')
  const customAction = createAction('myCustomAction')
  const reducer = depthOneReducerCreator(
    actionMap,
    entity => entity.id,
    on(customAction, s => ({ ...s, selectedId: 'custom-action-test' }))
  )
  const state = defaultInitialState

  it('should reduce findAll', () => {
    expect(reducer(state, actionMap.findAll({}))).toEqual({
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
    expect(reducer(state, actionMap.search({}))).toEqual({
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
    expect(reducer(state, actionMap.findOne('test-id'))).toEqual({
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
    expect(reducer(state, actionMap.create(demoUser))).toEqual({
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
    expect(reducer(state, actionMap.update(demoUser))).toEqual({
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
    expect(reducer(state, actionMap.delete('test-user'))).toEqual({
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
          rows: [demoUser],
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
      entities: { 'test-id': demoUser },
      ids: ['test-id'],

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
          rows: [demoUser],
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
      entities: { 'test-id': demoUser },
      ids: ['test-id'],

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
    expect(reducer(state, actionMap.findOneSuccess(demoUser))).toEqual({
      entities: { 'test-id': demoUser },
      ids: ['test-id'],

      loaded: true,
      loading: false,

      selectedId: 'test-id',

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
    expect(reducer(state, actionMap.createSuccess(demoUser))).toEqual({
      entities: { 'test-id': demoUser },
      ids: ['test-id'],

      loaded: true,
      loading: false,

      selectedId: 'test-id',

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
    expect(reducer(state, actionMap.updateSuccess(demoUser))).toEqual({
      entities: { 'test-id': demoUser },
      ids: ['test-id'],

      loaded: true,
      loading: false,

      selectedId: 'test-id',

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
          entities: { 'test-id': demoUser },
          ids: ['test-id'],

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
        actionMap.deleteSuccess(demoUser)
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
          entities: { 'test-id': demoUser },
          ids: ['test-id'],

          loaded: true,
          loading: false,

          selectedId: 'test-id',

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
        actionMap.deleteSuccess(demoUser)
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
          entities: { 'test-id': demoUser },
          ids: ['test-id'],

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
        actionMap.deleteSuccess(demoUser)
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
    const errorPayload = { message: 'error message' }

    expect(reducer(state, actionMap.findAllFailure(errorPayload))).toEqual(errorState)
    expect(reducer(state, actionMap.searchFailure(errorPayload))).toEqual(errorState)
    expect(reducer(state, actionMap.findOneFailure(errorPayload))).toEqual(errorState)
    expect(reducer(state, actionMap.createFailure(errorPayload))).toEqual(errorState)
    expect(reducer(state, actionMap.updateFailure(errorPayload))).toEqual(errorState)
    expect(reducer(state, actionMap.deleteFailure(errorPayload))).toEqual(errorState)
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
