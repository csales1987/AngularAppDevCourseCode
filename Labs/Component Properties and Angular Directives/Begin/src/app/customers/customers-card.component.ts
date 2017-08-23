import { Component, OnInit, ChangeDetectionStrategy, Input } from '@angular/core';

import { ICustomer } from '../shared/interfaces';
import { TrackByService } from '../core/services/trackby.service';

@Component({ 
  moduleId: module.id,
  selector: 'cm-customers-card', 
  templateUrl: 'customers-card.component.html',
  styleUrls: [ 'customers-card.component.css' ],
  //When using OnPush detectors, then the framework will check an OnPush 
  //component when any of its input properties changes, when it fires 
  //an event, or when an observable fires an event ~ Victor Savkin (Angular Team)
  changeDetection: ChangeDetectionStrategy.OnPush 
})
export class CustomersCardComponent implements OnInit {

  //Add Input property here
  @Input()
  customers: ICustomer[];
  
  constructor(public trackbyService: TrackByService) { }
  
  ngOnInit() {
    this.customers = [];
  }

}

