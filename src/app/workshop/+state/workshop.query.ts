import { Injectable } from '@angular/core'
import { QueryEntity, EntityUIQuery, ID, QueryConfig, Order } from '@datorama/akita'
import {
  WorkshopStore,
  WorkshopState,
  WorkshopUI,
  WorkshopUIState
} from './workshop.store'
import { map } from 'rxjs/operators'
import { Observable } from 'rxjs'

@QueryConfig({
//  sortBy: 'name',
//  sortByOrder: Order.ASC // Order.DESC
})

@Injectable({ providedIn: 'root' })
export class WorkshopQuery extends QueryEntity<WorkshopState> {
  ui: EntityUIQuery<WorkshopUIState, WorkshopUI>

  activeStep$ = this.selectActive().pipe(
    map(workshop => {
      return workshop.steps[0]
    })
  )

  constructor(protected store: WorkshopStore) {
    super(store)
    this.createUIQuery()
  }

  steps$ = this.selectActive().pipe(map(workshop => workshop.steps))

  getCurrentWorkshop(){
    return this.getActive();
  }

  setUIDescriptionIsOpen(id: ID) {
    this.store.ui.upsert(id, entity => ({ isOpen: !entity.isOpen }))
  }

  selectUIisOpenEntity(id: ID): Observable<boolean> {
    return this.ui.selectEntity(id, 'isOpen')
  }
}
