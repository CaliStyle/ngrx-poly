import { Injectable } from '@angular/core'
import { async, TestBed } from '@angular/core/testing'
import { RouterTestingModule } from '@angular/router/testing'
import { Actions } from '@ngrx/effects'
import { provideMockActions } from '@ngrx/effects/testing'
import { StoreModule } from '@ngrx/store'
import { of, ReplaySubject } from 'rxjs'
import { createRootActionMap } from '../actions/create-action-map'
import { depthOneEffectCreators } from './depth-one-effect-creators'

const actionMap = createRootActionMap().depthOne('user')

@Injectable()
class Service {
  constructor() {}

  findAll() {
    return of({ rows: [], pagination: {} as any })
  }

  create(u) {
    return of(u)
  }
}

@Injectable()
class MyEffects {
  effects = depthOneEffectCreators(actionMap, this.actions$, this.service as any)

  findAll$ = this.effects.findAll
  findOne$ = this.effects.findOne
  create$ = this.effects.create

  constructor(private actions$: Actions, private service: Service) {}
}

describe('DepthOne EffectCreators', () => {
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
    actions.next(actionMap.findAll({}))
    effects.findAll$.subscribe(() => {
      expect(service.findAll).toHaveBeenCalled()
    })
  }))

  it('should call findAll in service', async(async () => {
    actions.next(actionMap.create({ name: 'steve' }))
    effects.findAll$.subscribe(() => {
      expect(service.create).toHaveBeenCalledWith({ name: 'steve' })
    })
  }))

  it('should return failure action if method is not available', async(async () => {
    actions.next(actionMap.findOne(3))
    // expect the effect to be called at some point
    effects.findOne$.subscribe(() => {
      expect(actionMap.findOneFailure).toHaveBeenCalled()
    })
  }))
})
