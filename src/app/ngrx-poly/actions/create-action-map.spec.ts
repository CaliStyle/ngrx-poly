import { createRootActionMap, createActionMap } from './create-action-map'
import { depthOne } from './depth-one-action-map'
import { depthTwo } from './depth-two-action-map'

describe('createActionMap', () => {
  // not ideal...
  it('should create a root action map', () => {
    const rootActionMap = createRootActionMap()

    expect(rootActionMap.depthOne.toString()).toEqual(depthOne(null).toString())
    expect(rootActionMap.depthTwo.toString()).toEqual(depthTwo(null).toString())
  })

  it('should create a feature action map', () => {
    const featureActionMap = createActionMap('users')
    expect(featureActionMap.depthOne.toString()).toEqual(depthOne('users').toString())
    expect(featureActionMap.depthTwo.toString()).toEqual(depthTwo('users').toString())
  })
})
