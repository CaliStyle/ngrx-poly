import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core'
import { Store, select } from '@ngrx/store'
import { homeActions } from './store/actions'
import * as fromHome from './store/reducers'

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class HomeComponent implements OnInit {
  public appTitle: string
  public homeTitle: string

  todos$ = this.store.pipe(select(fromHome.todos.getAll))
  todosState$ = this.store.pipe(select(fromHome.todos.getState))

  constructor(private store: Store<any>) {}

  ngOnInit() {
    this.store.dispatch(homeActions.findAll({}))

    this.appTitle = 'NgrxPoly'
    this.homeTitle = 'Hello World'
  }
}
