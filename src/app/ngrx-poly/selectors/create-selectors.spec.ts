import { createSelectors, createRootSelectors } from './create-selectors'
import { createFeatureSelector } from '@ngrx/store'
import { defaultInitialState } from '../reducers/state'

const fromUsers = createFeatureSelector('users')

const appSelectors = createRootSelectors('app')
const appSelectorsWithAlternateSelected = createRootSelectors('app', state => state.ids[1])
const userSelectors = createSelectors(fromUsers, 'users')
const userSelectorsAlternateSelected = createSelectors(fromUsers, 'users', state => state.ids[1])

const state = {
  users: {
    users: {
      entities: {
        myId: { id: 'myId' },
        testId: { id: 'testId' },
      },
      ids: ['myId', 'testId'],

      loaded: true,
      loading: false,

      selectedId: 'myId',

      total: 0,
      offset: 0,
      limit: 0,
      page: 0,
      pages: 0,
      filter: [],
      sort: [[]],
      includes: null,
      error: null,
    },
  },
  app: {
    entities: { otherId: { id: 'otherId' }, yetAnotherId: { id: 'yetAnotherId' } },
    ids: ['otherId', 'yetAnotherId'],

    loaded: true,
    loading: false,

    selectedId: 'otherId',

    total: 0,
    offset: 0,
    limit: 0,
    page: 0,
    pages: 0,
    filter: [],
    sort: [[]],
    includes: null,
    error: null,
  },
}

describe('selectors', () => {
  describe('createSelectors', () => {
    it('should get all entities as array', () => {
      expect(userSelectors.getAll(state)).toEqual([{ id: 'myId' }, { id: 'testId' }])
    })
    it('should get entities', () => {
      expect(userSelectors.getEntities(state)).toEqual({ myId: { id: 'myId' }, testId: { id: 'testId' } })
    })

    it('should get loaded', () => {
      expect(userSelectors.getLoaded(state)).toEqual(true)
    })

    it('should get loading', () => {
      expect(userSelectors.getLoading(state)).toEqual(false)
    })

    it('should get pagination', () => {
      expect(userSelectors.getPagination(state)).toEqual({
        total: 0,
        offset: 0,
        limit: 0,
        page: 0,
        pages: 0,
        filter: [],
        sort: [[]],
        includes: null,
      })
    })

    it('should get selected entity', () => {
      expect(userSelectors.getSelected(state)).toEqual({ id: 'myId' })
    })

    it('should get selected entity with optional override selector', () => {
      expect(userSelectorsAlternateSelected.getSelected(state)).toEqual({ id: 'testId' })
    })

    it('should get whole state object', () => {
      expect(userSelectors.getState(state)).toEqual({
        entities: {
          myId: { id: 'myId' },
          testId: { id: 'testId' },
        },
        ids: ['myId', 'testId'],

        loaded: true,
        loading: false,

        selectedId: 'myId',

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
  })

  describe('createRootSelectors', () => {
    it('should get all entities as array', () => {
      expect(appSelectors.getAll(state)).toEqual([{ id: 'otherId' }, { id: 'yetAnotherId' }])
    })
    it('should get entities', () => {
      expect(appSelectors.getEntities(state)).toEqual({ otherId: { id: 'otherId' }, yetAnotherId: { id: 'yetAnotherId' } })
    })

    it('should get loaded', () => {
      expect(appSelectors.getLoaded(state)).toEqual(true)
    })

    it('should get loading', () => {
      expect(appSelectors.getLoading(state)).toEqual(false)
    })

    it('should get pagination', () => {
      expect(appSelectors.getPagination(state)).toEqual({
        total: 0,
        offset: 0,
        limit: 0,
        page: 0,
        pages: 0,
        filter: [],
        sort: [[]],
        includes: null,
      })
    })

    it('should get selected entity', () => {
      expect(appSelectors.getSelected(state)).toEqual({ id: 'otherId' })
    })

    it('should get selected entity with optional override selector', () => {
      expect(appSelectorsWithAlternateSelected.getSelected(state)).toEqual({ id: 'yetAnotherId' })
    })

    it('should get whole state object', () => {
      expect(appSelectors.getState(state)).toEqual({
        entities: {
          otherId: { id: 'otherId' },
          yetAnotherId: { id: 'yetAnotherId' },
        },
        ids: ['otherId', 'yetAnotherId'],

        loaded: true,
        loading: false,

        selectedId: 'otherId',

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
  })
})
