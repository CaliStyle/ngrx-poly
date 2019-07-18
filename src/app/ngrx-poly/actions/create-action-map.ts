import { ActionMapD1, ActionMapD2 } from './action-map'
import { depthOne } from './depth-one-action-map'
import { depthTwo } from './depth-two-action-map'

interface FeatureActionMaps {
  depthOne: <T, U extends string>(entity: U) => ActionMapD1<T, U>
  depthTwo: <T, U, V extends string, W extends string>(parent: V, entity: W) => ActionMapD2<T, U, V, W>
}

export function createActionMap(feature: string): FeatureActionMaps {
  return {
    depthOne: depthOne(feature),
    depthTwo: depthTwo(feature),
  }
}

export function createRootActionMap() {
  return createActionMap(null)
}
