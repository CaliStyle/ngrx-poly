import { Injectable } from '@angular/core'
import { async, TestBed } from '@angular/core/testing'
import { RouterTestingModule } from '@angular/router/testing'
import { Actions } from '@ngrx/effects'
import { provideMockActions } from '@ngrx/effects/testing'
import { StoreModule } from '@ngrx/store'
import { of, ReplaySubject } from 'rxjs'
import { createRootActionMap } from '../actions/create-action-map'
import { depthTwoEffectCreators } from './depth-two-effect-creators'

const actionMap = createRootActionMap().depthTwo('user', 'customer')

const dummy = { name: 'steve' }

@Injectable()
class Service {
  constructor() {}

  findAll() {
    return of({ rows: [], pagination: {} as any })
  }

  create(user, customer) {
    return of(customer)
  }
}

@Injectable()
class MyEffects {
  effects = depthTwoEffectCreators(actionMap, this.actions$, this.service as any)

  findAll$ = this.effects.findAll
  findOne$ = this.effects.findOne
  create$ = this.effects.createAndAdd

  onError$ = this.effects.setOnErrorEffect((e: any) => {
    return { type: 'ERROR', e }
  })

  constructor(private actions$: Actions, private service: Service) {}
}

describe('DepthTwo EffectCreators', () => {
  let service: Service
  let effects: MyEffects
  let actions: ReplaySubject<any>

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [
        RouterTestingModule,
        StoreModule.forRoot({}),
        // other imports
      ],
      providers: [Service, MyEffects, provideMockActions(() => actions)],
    })
  }))

  beforeEach(() => {
    service = TestBed.get(Service)
    effects = TestBed.get(MyEffects)
    actions = new ReplaySubject(1)
    spyOn(service, 'findAll').and.callThrough()
    spyOn(actionMap, 'findOneFailure').and.callThrough()
  })

  it('should call findAll in service', async(async () => {
    actions.next(actionMap.findAll(dummy, {}))
    effects.findAll$.subscribe(() => {
      expect(service.findAll).toHaveBeenCalled()
    })
  }))

  it('should call findAll in service', async(async () => {
    actions.next(actionMap.createAndAdd(dummy, { name: 'Jonathan' }))
    effects.findAll$.subscribe(() => {
      expect(service.create).toHaveBeenCalledWith({ name: 'steve' }, { name: 'Jonathan' })
    })
  }))

  it('should return failure action if method is not available', async(async () => {
    actions.next(actionMap.findOne(dummy, 3))
    // expect the effect to be called at some point
    effects.findOne$.subscribe(() => {
      expect(actionMap.findOneFailure).toHaveBeenCalled()
    })
  }))

  it('should obey error effect', async(async () => {
    actions.next(actionMap.findOneFailure({}))
    // expect the effects to return an object
    effects.onError$.subscribe(errorAction => {
      expect(errorAction).toEqual({ type: 'ERROR', e: {} })
    })
  }))
})
