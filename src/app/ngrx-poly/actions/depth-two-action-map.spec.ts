import { depthTwo } from './depth-two-action-map'
import { Store } from '@ngrx/store'

const parentUser = { name: 'steve' }

describe('depthTwo action map', () => {
  describe('type checks', () => {
    const actionMap = depthTwo(null)('user', 'customer')
    const mockStore: Partial<Store<any>> = {
      dispatch: action => {},
    }
    it('should do absolutely nothing (this is just a compiler check to make sure actions can be dispatched)', () => {
      expect(() => {
        mockStore.dispatch(actionMap.findAll({}, {}))
        mockStore.dispatch(actionMap.findAllSuccess({ rows: [], pagination: null }))
        mockStore.dispatch(actionMap.findAllFailure({}))
        mockStore.dispatch(actionMap.search({}, {}))
        mockStore.dispatch(actionMap.searchSuccess({ rows: [], pagination: null }))
        mockStore.dispatch(actionMap.searchFailure({}))
        mockStore.dispatch(actionMap.findOne({}, 'str'))
        mockStore.dispatch(actionMap.findOneSuccess({}))
        mockStore.dispatch(actionMap.findOneFailure({}))
        mockStore.dispatch(actionMap.addOne({}, {}))
        mockStore.dispatch(actionMap.addOneSuccess({}))
        mockStore.dispatch(actionMap.addOneFailure({}))
        mockStore.dispatch(actionMap.addMany({}, []))
        mockStore.dispatch(actionMap.addManySuccess({ rows: [], pagination: null }))
        mockStore.dispatch(actionMap.addManyFailure({}))
        mockStore.dispatch(actionMap.createAndAdd({}, {}))
        mockStore.dispatch(actionMap.createAndAddSuccess({}))
        mockStore.dispatch(actionMap.createAndAddFailure({}))
        mockStore.dispatch(actionMap.remove({}, 'str'))
        mockStore.dispatch(actionMap.removeSuccess({}))
        mockStore.dispatch(actionMap.removeFailure({}))
        // mockStore.dispatch(actionMap.select('str'))
        // mockStore.dispatch(actionMap.deselect())
      }).not.toThrowError()
    })
  })

  describe('root', () => {
    const actionMap = depthTwo(null)('user', 'customer')

    /**
     * FIND ALL
     */
    it('should create findAll with query', () => {
      const findAll = actionMap.findAll(parentUser, { offset: 10 })
      expect(findAll.query).toEqual({ offset: 10 })
      expect(findAll.type).toEqual('ngrx-poly/user/customer/find-all')
    })

    it('should create findAllSuccess with payload', () => {
      const findAllSuccess = actionMap.findAllSuccess({ rows: [], pagination: {} as any })
      expect(findAllSuccess.rows).toEqual([])
      expect(findAllSuccess.pagination).toEqual({} as any)
      expect(findAllSuccess.type).toEqual('ngrx-poly/user/customer/find-all-success')
    })

    it('should create findAllFailure with error', () => {
      const findAllFailure = actionMap.findAllFailure({ message: 'Failed' })
      expect(findAllFailure.error).toEqual({ message: 'Failed' })
      expect(findAllFailure.type).toEqual('ngrx-poly/user/customer/find-all-failure')
    })

    /**
     * SEARCH
     */
    it('should create search with query', () => {
      const search = actionMap.search(parentUser, { offset: 10 })
      expect(search.query).toEqual({ offset: 10 })
      expect(search.type).toEqual('ngrx-poly/user/customer/search')
    })

    it('should create searchSuccess with payload', () => {
      const searchSuccess = actionMap.searchSuccess({ rows: [], pagination: {} as any })
      expect(searchSuccess.rows).toEqual([])
      expect(searchSuccess.pagination).toEqual({} as any)
      expect(searchSuccess.type).toEqual('ngrx-poly/user/customer/search-success')
    })

    it('should create searchFailure with error', () => {
      const searchFailure = actionMap.searchFailure({ message: 'Failed' })
      expect(searchFailure.error).toEqual({ message: 'Failed' })
      expect(searchFailure.type).toEqual('ngrx-poly/user/customer/search-failure')
    })

    /**
     * FIND ONR
     */
    it('should create findOne with key', () => {
      const findOne = actionMap.findOne(parentUser, 'ben')
      expect(findOne.id).toEqual('ben')
      expect(findOne.type).toEqual('ngrx-poly/user/customer/find-one')
    })

    it('should create findOneSuccess with payload', () => {
      const findOneSuccess = actionMap.findOneSuccess({ name: 'ben' })
      expect(findOneSuccess.customer).toEqual({ name: 'ben' })
      expect(findOneSuccess.type).toEqual('ngrx-poly/user/customer/find-one-success')
    })

    it('should create findOneFailure with error', () => {
      const findOneFailure = actionMap.findOneFailure({ message: 'Failed' })
      expect(findOneFailure.error).toEqual({ message: 'Failed' })
      expect(findOneFailure.type).toEqual('ngrx-poly/user/customer/find-one-failure')
    })

    /**
     * CREATE AND ADD
     */
    it('should create createAndAdd with payload', () => {
      const createAndAdd = actionMap.createAndAdd(parentUser, { name: 'Joshua' })
      expect(createAndAdd.customer).toEqual({ name: 'Joshua' })
      expect(createAndAdd.type).toEqual('ngrx-poly/user/customer/create-and-add')
    })

    it('should create createAndAddSuccess with payload', () => {
      const createAndAddSuccess = actionMap.createAndAddSuccess({ name: 'Joshua' })
      expect(createAndAddSuccess.customer).toEqual({ name: 'Joshua' })
      expect(createAndAddSuccess.type).toEqual('ngrx-poly/user/customer/create-and-add-success')
    })

    it('should create createAndAddFailure with error', () => {
      const createAndAddFailure = actionMap.createAndAddFailure({ message: 'Failed' })
      expect(createAndAddFailure.error).toEqual({ message: 'Failed' })
      expect(createAndAddFailure.type).toEqual('ngrx-poly/user/customer/create-and-add-failure')
    })

    /**
     * ADD ONE
     */
    it('should create addOne with payload', () => {
      const addOne = actionMap.addOne(parentUser, { name: 'Joshua' })
      expect(addOne.customer).toEqual({ name: 'Joshua' })
      expect(addOne.type).toEqual('ngrx-poly/user/customer/add-one')
    })

    it('should create addOneSuccess with payload', () => {
      const addOneSuccess = actionMap.addOneSuccess({ name: 'Joshua' })
      expect(addOneSuccess.customer).toEqual({ name: 'Joshua' })
      expect(addOneSuccess.type).toEqual('ngrx-poly/user/customer/add-one-success')
    })

    it('should create addOneFailure with error', () => {
      const addOneFailure = actionMap.addOneFailure({ message: 'Failed' })
      expect(addOneFailure.error).toEqual({ message: 'Failed' })
      expect(addOneFailure.type).toEqual('ngrx-poly/user/customer/add-one-failure')
    })

    /**
     * ADD MANY
     */
    it('should create addMany with payload', () => {
      const addMany = actionMap.addMany(parentUser, [{ name: 'Joshua' }])
      expect(addMany.customer).toEqual([{ name: 'Joshua' }])
      expect(addMany.type).toEqual('ngrx-poly/user/customer/add-many')
    })

    it('should create addManySuccess with payload', () => {
      const addManySuccess = actionMap.addManySuccess({ rows: [{ name: 'Joshua' }], pagination: null })
      expect(addManySuccess.rows).toEqual([{ name: 'Joshua' }])
      expect(addManySuccess.pagination).toEqual(null)
      expect(addManySuccess.type).toEqual('ngrx-poly/user/customer/add-many-success')
    })

    it('should create addManyFailure with error', () => {
      const addManyFailure = actionMap.addManyFailure({ message: 'Failed' })
      expect(addManyFailure.error).toEqual({ message: 'Failed' })
      expect(addManyFailure.type).toEqual('ngrx-poly/user/customer/add-many-failure')
    })

    /**
     * FIND ONR
     */
    it('should create remove with query', () => {
      const remove = actionMap.remove(parentUser, 'john')
      expect(remove.id).toEqual('john')
      expect(remove.type).toEqual('ngrx-poly/user/customer/remove')
    })

    it('should create removeSuccess with payload', () => {
      const removeSuccess = actionMap.removeSuccess({ name: 'john' })
      expect(removeSuccess.customer).toEqual({ name: 'john' })
      expect(removeSuccess.type).toEqual('ngrx-poly/user/customer/remove-success')
    })

    it('should create removeFailure with error', () => {
      const removeFailure = actionMap.removeFailure({ message: 'Failed' })
      expect(removeFailure.error).toEqual({ message: 'Failed' })
      expect(removeFailure.type).toEqual('ngrx-poly/user/customer/remove-failure')
    })
  })

  describe('feature', () => {
    const actionMap = depthTwo('users')('user', 'customer')

    /**
     * FIND ALL
     */
    it('should create findAll with query', () => {
      const findAll = actionMap.findAll(parentUser, { offset: 10 })
      expect(findAll.query).toEqual({ offset: 10 })
      expect(findAll.type).toEqual('ngrx-poly/users/user/customer/find-all')
    })

    it('should create findAllSuccess with payload', () => {
      const findAllSuccess = actionMap.findAllSuccess({ rows: [], pagination: {} as any })
      expect(findAllSuccess.rows).toEqual([])
      expect(findAllSuccess.pagination).toEqual({} as any)
      expect(findAllSuccess.type).toEqual('ngrx-poly/users/user/customer/find-all-success')
    })

    it('should create findAllFailure with error', () => {
      const findAllFailure = actionMap.findAllFailure({ message: 'Failed' })
      expect(findAllFailure.error).toEqual({ message: 'Failed' })
      expect(findAllFailure.type).toEqual('ngrx-poly/users/user/customer/find-all-failure')
    })

    /**
     * SEARCH
     */
    it('should create search with query', () => {
      const search = actionMap.search(parentUser, { offset: 10 })
      expect(search.query).toEqual({ offset: 10 })
      expect(search.type).toEqual('ngrx-poly/users/user/customer/search')
    })

    it('should create searchSuccess with payload', () => {
      const searchSuccess = actionMap.searchSuccess({ rows: [], pagination: {} as any })
      expect(searchSuccess.rows).toEqual([])
      expect(searchSuccess.pagination).toEqual({} as any)
      expect(searchSuccess.type).toEqual('ngrx-poly/users/user/customer/search-success')
    })

    it('should create searchFailure with error', () => {
      const searchFailure = actionMap.searchFailure({ message: 'Failed' })
      expect(searchFailure.error).toEqual({ message: 'Failed' })
      expect(searchFailure.type).toEqual('ngrx-poly/users/user/customer/search-failure')
    })

    /**
     * FIND ONR
     */
    it('should create findOne with key', () => {
      const findOne = actionMap.findOne(parentUser, 'steve')
      expect(findOne.id).toEqual('steve')
      expect(findOne.type).toEqual('ngrx-poly/users/user/customer/find-one')
    })

    it('should create findOneSuccess with payload', () => {
      const findOneSuccess = actionMap.findOneSuccess({ name: 'steve' })
      expect(findOneSuccess.customer).toEqual({ name: 'steve' })
      expect(findOneSuccess.type).toEqual('ngrx-poly/users/user/customer/find-one-success')
    })

    it('should create findOneFailure with error', () => {
      const findOneFailure = actionMap.findOneFailure({ message: 'Failed' })
      expect(findOneFailure.error).toEqual({ message: 'Failed' })
      expect(findOneFailure.type).toEqual('ngrx-poly/users/user/customer/find-one-failure')
    })

    /**
     * CREATE AND ADD
     */
    it('should create createAndAdd with payload', () => {
      const createAndAdd = actionMap.createAndAdd(parentUser, { name: 'Joshua' })
      expect(createAndAdd.customer).toEqual({ name: 'Joshua' })
      expect(createAndAdd.type).toEqual('ngrx-poly/users/user/customer/create-and-add')
    })

    it('should create createAndAddSuccess with payload', () => {
      const createAndAddSuccess = actionMap.createAndAddSuccess({ name: 'Joshua' })
      expect(createAndAddSuccess.customer).toEqual({ name: 'Joshua' })
      expect(createAndAddSuccess.type).toEqual('ngrx-poly/users/user/customer/create-and-add-success')
    })

    it('should createAndAdd createAndAddFailure with error', () => {
      const createAndAddFailure = actionMap.createAndAddFailure({ message: 'Failed' })
      expect(createAndAddFailure.error).toEqual({ message: 'Failed' })
      expect(createAndAddFailure.type).toEqual('ngrx-poly/users/user/customer/create-and-add-failure')
    })

    /**
     * addOne
     */
    it('should create addOne with payload', () => {
      const addOne = actionMap.addOne(parentUser, { name: 'Joshua' })
      expect(addOne.customer).toEqual({ name: 'Joshua' })
      expect(addOne.type).toEqual('ngrx-poly/users/user/customer/add-one')
    })

    it('should create addOneSuccess with payload', () => {
      const addOneSuccess = actionMap.addOneSuccess({ name: 'Joshua' })
      expect(addOneSuccess.customer).toEqual({ name: 'Joshua' })
      expect(addOneSuccess.type).toEqual('ngrx-poly/users/user/customer/add-one-success')
    })

    it('should create addOneFailure with error', () => {
      const addOneFailure = actionMap.addOneFailure({ message: 'Failed' })
      expect(addOneFailure.error).toEqual({ message: 'Failed' })
      expect(addOneFailure.type).toEqual('ngrx-poly/users/user/customer/add-one-failure')
    })

    /**
     * ADD MANY
     */
    it('should create addMany with payload', () => {
      const addMany = actionMap.addMany(parentUser, [{ name: 'Joshua' }])
      expect(addMany.customer).toEqual([{ name: 'Joshua' }])
      expect(addMany.type).toEqual('ngrx-poly/users/user/customer/add-many')
    })

    it('should create addManySuccess with payload', () => {
      const addManySuccess = actionMap.addManySuccess({ rows: [{ name: 'Joshua' }], pagination: null })
      expect(addManySuccess.rows).toEqual([{ name: 'Joshua' }])
      expect(addManySuccess.pagination).toEqual(null)
      expect(addManySuccess.type).toEqual('ngrx-poly/users/user/customer/add-many-success')
    })

    it('should create addManyFailure with error', () => {
      const addManyFailure = actionMap.addManyFailure({ message: 'Failed' })
      expect(addManyFailure.error).toEqual({ message: 'Failed' })
      expect(addManyFailure.type).toEqual('ngrx-poly/users/user/customer/add-many-failure')
    })

    /**
     * FIND ONR
     */
    it('should create remove with query', () => {
      const remove = actionMap.remove(parentUser, 'steve')
      expect(remove.id).toEqual('steve')
      expect(remove.type).toEqual('ngrx-poly/users/user/customer/remove')
    })

    it('should create removeSuccess with payload', () => {
      const removeSuccess = actionMap.removeSuccess({ name: 'steve' })
      expect(removeSuccess.customer).toEqual({ name: 'steve' })
      expect(removeSuccess.type).toEqual('ngrx-poly/users/user/customer/remove-success')
    })

    it('should create removeFailure with error', () => {
      const removeFailure = actionMap.removeFailure({ message: 'Failed' })
      expect(removeFailure.error).toEqual({ message: 'Failed' })
      expect(removeFailure.type).toEqual('ngrx-poly/users/user/customer/remove-failure')
    })
  })
})
