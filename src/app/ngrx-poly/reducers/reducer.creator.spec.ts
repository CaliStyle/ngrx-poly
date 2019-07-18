import { ReducerCreators } from './reducer-creators'
import { depthOneReducerCreator } from './depth-one-reducer'
import { depthTwoReducerCreator } from './depth-two-reducer'

describe('ReducerCreators', () => {
  // not ideal...
  it('should map reducer creators to friendly functions', () => {
    expect(ReducerCreators.createDepthOneReducer.toString()).toEqual(depthOneReducerCreator.toString())
    expect(ReducerCreators.createDepthTwoReducer.toString()).toEqual(depthTwoReducerCreator.toString())
  })
})
