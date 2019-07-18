import { Todo } from '../../models/Todo'
import { User } from '../../../500/models/User'
import { homeActionsCreator } from './actions'

export const homeActions = homeActionsCreator.depthOne<Todo, 'todo'>('todo')
