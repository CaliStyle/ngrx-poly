import { depthOne } from './depth-one-action-map'
import { Store } from '@ngrx/store'

describe('depthOne action map', () => {
  describe('type checks', () => {
    const actionMap = depthOne(null)('user')
    const mockStore: Partial<Store<any>> = {
      dispatch: action => {},
    }
    it('should do absolutely nothing (this is just a compiler check to make sure actions can be dispatched)', () => {
      expect(() => {
        mockStore.dispatch(actionMap.findAll({}))
        mockStore.dispatch(actionMap.findAllSuccess({ rows: [], pagination: null }))
        mockStore.dispatch(actionMap.findAllFailure({}))
        mockStore.dispatch(actionMap.search({}))
        mockStore.dispatch(actionMap.searchSuccess({ rows: [], pagination: null }))
        mockStore.dispatch(actionMap.searchFailure({}))
        mockStore.dispatch(actionMap.findOne('str'))
        mockStore.dispatch(actionMap.findOneSuccess({}))
        mockStore.dispatch(actionMap.findOneFailure({}))
        mockStore.dispatch(actionMap.update({}))
        mockStore.dispatch(actionMap.updateSuccess({}))
        mockStore.dispatch(actionMap.updateFailure({}))
        mockStore.dispatch(actionMap.create({}))
        mockStore.dispatch(actionMap.createSuccess({}))
        mockStore.dispatch(actionMap.createFailure({}))
        mockStore.dispatch(actionMap.delete('str'))
        mockStore.dispatch(actionMap.deleteSuccess({}))
        mockStore.dispatch(actionMap.deleteFailure({}))
        mockStore.dispatch(actionMap.select('str'))
        mockStore.dispatch(actionMap.deselect())
      }).not.toThrowError()
    })
  })

  describe('root', () => {
    const actionMap = depthOne(null)('user')

    /**
     * FIND ALL
     */
    it('should create findAll with query', () => {
      const findAll = actionMap.findAll({ offset: 10 })
      expect(findAll.query).toEqual({ offset: 10 })
      expect(findAll.type).toEqual('ngrx-poly/user/find-all')
    })

    it('should create findAllSuccess with payload', () => {
      const findAllSuccess = actionMap.findAllSuccess({ rows: [], pagination: {} as any })
      expect(findAllSuccess.rows).toEqual([])
      expect(findAllSuccess.pagination).toEqual({} as any)
      expect(findAllSuccess.type).toEqual('ngrx-poly/user/find-all-success')
    })

    it('should create findAllFailure with error', () => {
      const findAllFailure = actionMap.findAllFailure({ message: 'Failed' })
      expect(findAllFailure.error).toEqual({ message: 'Failed' })
      expect(findAllFailure.type).toEqual('ngrx-poly/user/find-all-failure')
    })

    /**
     * SEARCH
     */
    it('should create search with query', () => {
      const search = actionMap.search({ offset: 10 })
      expect(search.query).toEqual({ offset: 10 })
      expect(search.type).toEqual('ngrx-poly/user/search')
    })

    it('should create searchSuccess with payload', () => {
      const searchSuccess = actionMap.searchSuccess({ rows: [], pagination: {} as any })
      expect(searchSuccess.rows).toEqual([])
      expect(searchSuccess.pagination).toEqual({} as any)
      expect(searchSuccess.type).toEqual('ngrx-poly/user/search-success')
    })

    it('should create searchFailure with error', () => {
      const searchFailure = actionMap.searchFailure({ message: 'Failed' })
      expect(searchFailure.error).toEqual({ message: 'Failed' })
      expect(searchFailure.type).toEqual('ngrx-poly/user/search-failure')
    })

    /**
     * FIND ONR
     */
    it('should create findOne with key', () => {
      const findOne = actionMap.findOne('steve')
      expect(findOne.id).toEqual('steve')
      expect(findOne.type).toEqual('ngrx-poly/user/find-one')
    })

    it('should create findOneSuccess with payload', () => {
      const findOneSuccess = actionMap.findOneSuccess({ name: 'steve' })
      expect(findOneSuccess.user).toEqual({ name: 'steve' })
      expect(findOneSuccess.type).toEqual('ngrx-poly/user/find-one-success')
    })

    it('should create findOneFailure with error', () => {
      const findOneFailure = actionMap.findOneFailure({ message: 'Failed' })
      expect(findOneFailure.error).toEqual({ message: 'Failed' })
      expect(findOneFailure.type).toEqual('ngrx-poly/user/find-one-failure')
    })

    /**
     * CREATE
     */
    it('should create create with payload', () => {
      const create = actionMap.create({ name: 'Joshua' })
      expect(create.user).toEqual({ name: 'Joshua' })
      expect(create.type).toEqual('ngrx-poly/user/create')
    })

    it('should create createSuccess with payload', () => {
      const createSuccess = actionMap.createSuccess({ name: 'Joshua' })
      expect(createSuccess.user).toEqual({ name: 'Joshua' })
      expect(createSuccess.type).toEqual('ngrx-poly/user/create-success')
    })

    it('should create createFailure with error', () => {
      const createFailure = actionMap.createFailure({ message: 'Failed' })
      expect(createFailure.error).toEqual({ message: 'Failed' })
      expect(createFailure.type).toEqual('ngrx-poly/user/create-failure')
    })

    /**
     * UPDATE
     */
    it('should create update with payload', () => {
      const update = actionMap.update({ name: 'Joshua' })
      expect(update.user).toEqual({ name: 'Joshua' })
      expect(update.type).toEqual('ngrx-poly/user/update')
    })

    it('should create updateSuccess with payload', () => {
      const updateSuccess = actionMap.updateSuccess({ name: 'Joshua' })
      expect(updateSuccess.user).toEqual({ name: 'Joshua' })
      expect(updateSuccess.type).toEqual('ngrx-poly/user/update-success')
    })

    it('should create updateFailure with error', () => {
      const updateFailure = actionMap.updateFailure({ message: 'Failed' })
      expect(updateFailure.error).toEqual({ message: 'Failed' })
      expect(updateFailure.type).toEqual('ngrx-poly/user/update-failure')
    })

    /**
     * FIND ONR
     */
    it('should create delete with query', () => {
      // deleteAction avoids collisions with the `delete` operator
      const deleteAction = actionMap.delete('steve')
      expect(deleteAction.id).toEqual('steve')
      expect(deleteAction.type).toEqual('ngrx-poly/user/delete')
    })

    it('should create deleteSuccess with payload', () => {
      const deleteSuccess = actionMap.deleteSuccess({ name: 'steve' })
      expect(deleteSuccess.user).toEqual({ name: 'steve' })
      expect(deleteSuccess.type).toEqual('ngrx-poly/user/delete-success')
    })

    it('should create deleteFailure with error', () => {
      const deleteFailure = actionMap.deleteFailure({ message: 'Failed' })
      expect(deleteFailure.error).toEqual({ message: 'Failed' })
      expect(deleteFailure.type).toEqual('ngrx-poly/user/delete-failure')
    })
  })

  describe('feature', () => {
    const actionMap = depthOne('users')('user')

    /**
     * FIND ALL
     */
    it('should create findAll with query', () => {
      const findAll = actionMap.findAll({ offset: 10 })
      expect(findAll.query).toEqual({ offset: 10 })
      expect(findAll.type).toEqual('ngrx-poly/users/user/find-all')
    })

    it('should create findAllSuccess with payload', () => {
      const findAllSuccess = actionMap.findAllSuccess({ rows: [], pagination: {} as any })
      expect(findAllSuccess.rows).toEqual([])
      expect(findAllSuccess.pagination).toEqual({} as any)
      expect(findAllSuccess.type).toEqual('ngrx-poly/users/user/find-all-success')
    })

    it('should create findAllFailure with error', () => {
      const findAllFailure = actionMap.findAllFailure({ message: 'Failed' })
      expect(findAllFailure.error).toEqual({ message: 'Failed' })
      expect(findAllFailure.type).toEqual('ngrx-poly/users/user/find-all-failure')
    })

    /**
     * SEARCH
     */
    it('should create search with query', () => {
      const search = actionMap.search({ offset: 10 })
      expect(search.query).toEqual({ offset: 10 })
      expect(search.type).toEqual('ngrx-poly/users/user/search')
    })

    it('should create searchSuccess with payload', () => {
      const searchSuccess = actionMap.searchSuccess({ rows: [], pagination: {} as any })
      expect(searchSuccess.rows).toEqual([])
      expect(searchSuccess.pagination).toEqual({} as any)
      expect(searchSuccess.type).toEqual('ngrx-poly/users/user/search-success')
    })

    it('should create searchFailure with error', () => {
      const searchFailure = actionMap.searchFailure({ message: 'Failed' })
      expect(searchFailure.error).toEqual({ message: 'Failed' })
      expect(searchFailure.type).toEqual('ngrx-poly/users/user/search-failure')
    })

    /**
     * FIND ONR
     */
    it('should create findOne with key', () => {
      const findOne = actionMap.findOne('steve')
      expect(findOne.id).toEqual('steve')
      expect(findOne.type).toEqual('ngrx-poly/users/user/find-one')
    })

    it('should create findOneSuccess with payload', () => {
      const findOneSuccess = actionMap.findOneSuccess({ name: 'steve' })
      expect(findOneSuccess.user).toEqual({ name: 'steve' })
      expect(findOneSuccess.type).toEqual('ngrx-poly/users/user/find-one-success')
    })

    it('should create findOneFailure with error', () => {
      const findOneFailure = actionMap.findOneFailure({ message: 'Failed' })
      expect(findOneFailure.error).toEqual({ message: 'Failed' })
      expect(findOneFailure.type).toEqual('ngrx-poly/users/user/find-one-failure')
    })

    /**
     * CREATE
     */
    it('should create create with payload', () => {
      const create = actionMap.create({ name: 'Joshua' })
      expect(create.user).toEqual({ name: 'Joshua' })
      expect(create.type).toEqual('ngrx-poly/users/user/create')
    })

    it('should create createSuccess with payload', () => {
      const createSuccess = actionMap.createSuccess({ name: 'Joshua' })
      expect(createSuccess.user).toEqual({ name: 'Joshua' })
      expect(createSuccess.type).toEqual('ngrx-poly/users/user/create-success')
    })

    it('should create createFailure with error', () => {
      const createFailure = actionMap.createFailure({ message: 'Failed' })
      expect(createFailure.error).toEqual({ message: 'Failed' })
      expect(createFailure.type).toEqual('ngrx-poly/users/user/create-failure')
    })

    /**
     * UPDATE
     */
    it('should create update with payload', () => {
      const update = actionMap.update({ name: 'Joshua' })
      expect(update.user).toEqual({ name: 'Joshua' })
      expect(update.type).toEqual('ngrx-poly/users/user/update')
    })

    it('should create updateSuccess with payload', () => {
      const updateSuccess = actionMap.updateSuccess({ name: 'Joshua' })
      expect(updateSuccess.user).toEqual({ name: 'Joshua' })
      expect(updateSuccess.type).toEqual('ngrx-poly/users/user/update-success')
    })

    it('should create updateFailure with error', () => {
      const updateFailure = actionMap.updateFailure({ message: 'Failed' })
      expect(updateFailure.error).toEqual({ message: 'Failed' })
      expect(updateFailure.type).toEqual('ngrx-poly/users/user/update-failure')
    })

    /**
     * FIND ONR
     */
    it('should create delete with query', () => {
      // deleteAction avoids collisions with the `delete` operator
      const deleteAction = actionMap.delete('steve')
      expect(deleteAction.id).toEqual('steve')
      expect(deleteAction.type).toEqual('ngrx-poly/users/user/delete')
    })

    it('should create deleteSuccess with payload', () => {
      const deleteSuccess = actionMap.deleteSuccess({ name: 'steve' })
      expect(deleteSuccess.user).toEqual({ name: 'steve' })
      expect(deleteSuccess.type).toEqual('ngrx-poly/users/user/delete-success')
    })

    it('should create deleteFailure with error', () => {
      const deleteFailure = actionMap.deleteFailure({ message: 'Failed' })
      expect(deleteFailure.error).toEqual({ message: 'Failed' })
      expect(deleteFailure.type).toEqual('ngrx-poly/users/user/delete-failure')
    })
  })
})
