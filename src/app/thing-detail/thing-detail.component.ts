import { Component, OnInit, Input } from '@angular/core';

import { ActivatedRoute } from '@angular/router';
import { Location } from '@angular/common';

import { Thing } from '../thing';
import { ThingService } from '../thing.service';

@Component({
  selector: 'app-thing-detail',
  templateUrl: './thing-detail.component.html',
  styleUrls: ['./thing-detail.component.css']
})
export class ThingDetailComponent implements OnInit {

  @Input() thing: Thing;

  constructor(
    private route: ActivatedRoute,
    private thingService: ThingService,
    private location: Location) { }

  ngOnInit(): void {
    this.getThing();
  }

  getThing(): void {
    const id = +this.route.snapshot.paramMap.get('id') + "";
    this.thingService.getThing(id)
        .subscribe(thing => this.thing = thing);
  }

}
