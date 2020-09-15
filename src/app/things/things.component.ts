import { Component, OnInit } from '@angular/core';

import { Thing } from '../thing';
import { ThingService } from '../thing.service';

import { DOCUMENT } from '@angular/common';

@Component({
  selector: 'app-things',
  templateUrl: './things.component.html',
  styleUrls: ['./things.component.css']
})
export class ThingsComponent implements OnInit {

  things: Thing[];
  rc: string[] = ['', 'hsl(9, 88%, 61%)', 'hsl(9, 83%, 76%)', 'hsl(48, 95%, 48%)', 'hsl(93, 77%, 44%)', 'hsl(93, 67%, 38%)'];

  constructor(private thingService: ThingService) { }

  ngOnInit(): void {
    this.getThings()
  }

  getThings(): void {
    this.thingService.getThings()
        .subscribe(
          thingsResponse => {
            console.log(thingsResponse);
            this.things = [];
            for (var extThing of thingsResponse.things) {
              let thing: Thing = {
                id: extThing.id,
                name: extThing.name,
                email: extThing.email,
                created: extThing.created,
                rate: extThing.rate,
                description: extThing.description
              }
              this.things.push(thing);
            }
          },
          err => console.error("oops! " + err)
        );
  }

  rateColor(rate): string {
    if (rate === undefined || rate == '') {
      return "";
    }
    return this.rc[rate];
  }

  onDownload(): void {
    this.thingService.download()
    .subscribe(blob => {
        const a = document.createElement('a')
        const objectUrl = URL.createObjectURL(blob)
        a.href = objectUrl
        a.download = 'things';
        a.click();
        URL.revokeObjectURL(objectUrl);
      });
  }
}
