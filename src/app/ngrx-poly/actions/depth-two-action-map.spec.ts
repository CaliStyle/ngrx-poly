import { depthTwo } from './depth-two-action-map'

const parentUser = { name: 'steve' }

describe('depthTwo action map', () => {
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
     * CREATE
     */
    it('should create create with payload', () => {
      const create = actionMap.create(parentUser, { name: 'Joshua' })
      expect(create.customer).toEqual({ name: 'Joshua' })
      expect(create.type).toEqual('ngrx-poly/user/customer/create')
    })

    it('should create createSuccess with payload', () => {
      const createSuccess = actionMap.createSuccess({ name: 'Joshua' })
      expect(createSuccess.customer).toEqual({ name: 'Joshua' })
      expect(createSuccess.type).toEqual('ngrx-poly/user/customer/create-success')
    })

    it('should create createFailure with error', () => {
      const createFailure = actionMap.createFailure({ message: 'Failed' })
      expect(createFailure.error).toEqual({ message: 'Failed' })
      expect(createFailure.type).toEqual('ngrx-poly/user/customer/create-failure')
    })

    /**
     * UPDATE
     */
    it('should create update with payload', () => {
      const update = actionMap.update(parentUser, { name: 'Joshua' })
      expect(update.customer).toEqual({ name: 'Joshua' })
      expect(update.type).toEqual('ngrx-poly/user/customer/update')
    })

    it('should create updateSuccess with payload', () => {
      const updateSuccess = actionMap.updateSuccess({ name: 'Joshua' })
      expect(updateSuccess.customer).toEqual({ name: 'Joshua' })
      expect(updateSuccess.type).toEqual('ngrx-poly/user/customer/update-success')
    })

    it('should create updateFailure with error', () => {
      const updateFailure = actionMap.updateFailure({ message: 'Failed' })
      expect(updateFailure.error).toEqual({ message: 'Failed' })
      expect(updateFailure.type).toEqual('ngrx-poly/user/customer/update-failure')
    })

    /**
     * FIND ONR
     */
    it('should create delete with query', () => {
      // deleteAction avoids collisions with the `delete` operator
      const deleteAction = actionMap.delete(parentUser, 'john')
      expect(deleteAction.id).toEqual('john')
      expect(deleteAction.type).toEqual('ngrx-poly/user/customer/delete')
    })

    it('should create deleteSuccess with payload', () => {
      const deleteSuccess = actionMap.deleteSuccess({ name: 'john' })
      expect(deleteSuccess.customer).toEqual({ name: 'john' })
      expect(deleteSuccess.type).toEqual('ngrx-poly/user/customer/delete-success')
    })

    it('should create deleteFailure with error', () => {
      const deleteFailure = actionMap.deleteFailure({ message: 'Failed' })
      expect(deleteFailure.error).toEqual({ message: 'Failed' })
      expect(deleteFailure.type).toEqual('ngrx-poly/user/customer/delete-failure')
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
     * CREATE
     */
    it('should create create with payload', () => {
      const create = actionMap.create(parentUser, { name: 'Joshua' })
      expect(create.customer).toEqual({ name: 'Joshua' })
      expect(create.type).toEqual('ngrx-poly/users/user/customer/create')
    })

    it('should create createSuccess with payload', () => {
      const createSuccess = actionMap.createSuccess({ name: 'Joshua' })
      expect(createSuccess.customer).toEqual({ name: 'Joshua' })
      expect(createSuccess.type).toEqual('ngrx-poly/users/user/customer/create-success')
    })

    it('should create createFailure with error', () => {
      const createFailure = actionMap.createFailure({ message: 'Failed' })
      expect(createFailure.error).toEqual({ message: 'Failed' })
      expect(createFailure.type).toEqual('ngrx-poly/users/user/customer/create-failure')
    })

    /**
     * UPDATE
     */
    it('should create update with payload', () => {
      const update = actionMap.update(parentUser, { name: 'Joshua' })
      expect(update.customer).toEqual({ name: 'Joshua' })
      expect(update.type).toEqual('ngrx-poly/users/user/customer/update')
    })

    it('should create updateSuccess with payload', () => {
      const updateSuccess = actionMap.updateSuccess({ name: 'Joshua' })
      expect(updateSuccess.customer).toEqual({ name: 'Joshua' })
      expect(updateSuccess.type).toEqual('ngrx-poly/users/user/customer/update-success')
    })

    it('should create updateFailure with error', () => {
      const updateFailure = actionMap.updateFailure({ message: 'Failed' })
      expect(updateFailure.error).toEqual({ message: 'Failed' })
      expect(updateFailure.type).toEqual('ngrx-poly/users/user/customer/update-failure')
    })

    /**
     * FIND ONR
     */
    it('should create delete with query', () => {
      // deleteAction avoids collisions with the `delete` operator
      const deleteAction = actionMap.delete(parentUser, 'steve')
      expect(deleteAction.id).toEqual('steve')
      expect(deleteAction.type).toEqual('ngrx-poly/users/user/customer/delete')
    })

    it('should create deleteSuccess with payload', () => {
      const deleteSuccess = actionMap.deleteSuccess({ name: 'steve' })
      expect(deleteSuccess.customer).toEqual({ name: 'steve' })
      expect(deleteSuccess.type).toEqual('ngrx-poly/users/user/customer/delete-success')
    })

    it('should create deleteFailure with error', () => {
      const deleteFailure = actionMap.deleteFailure({ message: 'Failed' })
      expect(deleteFailure.error).toEqual({ message: 'Failed' })
      expect(deleteFailure.type).toEqual('ngrx-poly/users/user/customer/delete-failure')
    })
  })
})
