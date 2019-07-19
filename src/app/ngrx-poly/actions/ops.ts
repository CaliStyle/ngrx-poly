export enum Op {
  FIND_ALL = 'find-all',
  FIND_ALL_SUCCESS = 'find-all-success',
  FIND_ALL_FAILURE = 'find-all-failure',

  SEARCH = 'search',
  SEARCH_SUCCESS = 'search-success',
  SEARCH_FAILURE = 'search-failure',

  FIND_ONE = 'find-one',
  FIND_ONE_SUCCESS = 'find-one-success',
  FIND_ONE_FAILURE = 'find-one-failure',

  // DEPTH 1 ONLY
  UPDATE = 'update',
  UPDATE_SUCCESS = 'update-success',
  UPDATE_FAILURE = 'update-failure',

  // DEPTH 1 ONLY
  CREATE = 'create',
  CREATE_SUCCESS = 'create-success',
  CREATE_FAILURE = 'create-failure',

  // DEPTH 1 ONLY
  DELETE = 'delete',
  DELETE_SUCCESS = 'delete-success',
  DELETE_FAILURE = 'delete-failure',

  // DEPTH 2+ ONLY
  ADD_ONE = 'add-one',
  ADD_ONE_SUCCESS = 'add-one-success',
  ADD_ONE_FAILURE = 'add-one-failure',

  // DEPTH 2+ ONLY
  ADD_MANY = 'add-many',
  ADD_MANY_SUCCESS = 'add-many-success',
  ADD_MANY_FAILURE = 'add-many-failure',

  // DEPTH 2+ ONLY
  CREATE_AND_ADD = 'create-and-add',
  CREATE_AND_ADD_SUCCESS = 'create-and-add-success',
  CREATE_AND_ADD_FAILURE = 'create-and-add-failure',

  REMOVE = 'remove',
  REMOVE_SUCCESS = 'remove-success',
  REMOVE_FAILURE = 'remove-failure',


  SELECT = 'select',
  DESELECT = 'deselect',
}
