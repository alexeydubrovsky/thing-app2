import { Component, OnInit } from '@angular/core';

import { Thing } from '../thing';
import { ThingService } from '../thing.service';
import { MessageService } from '../message.service';

import { DOCUMENT } from '@angular/common';

@Component({
  selector: 'app-things',
  templateUrl: './things.component.html',
  styleUrls: ['./things.component.css']
})
export class ThingsComponent implements OnInit {

  things: Thing[];
  rc: string[] = ['', 'hsl(9, 88%, 61%)', 'hsl(9, 83%, 76%)', 'hsl(48, 95%, 48%)', 'hsl(93, 77%, 44%)', 'hsl(93, 67%, 38%)'];

  selectedThing: Thing;

  constructor(private thingService: ThingService, private messageService: MessageService) { }

  ngOnInit(): void {
    this.getThings()
  }

  getThings(): void {
    this.thingService.getThings()
        .subscribe(
          thingsResponse => {
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
            if (this.things.length > 0) {
              this.onSelect(this.things[0]);
            }
          },
          err => {
            this.messageService.add("Error during thing list retrieval: " + err);
          }
        );
  }

  rateColor(rate): string {
    if (rate === undefined || rate == '') {
      return "";
    }
    return this.rc[rate];
  }

  onSelect(thing: Thing): void {
    this.selectedThing = thing;
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
      },
      err => {
        this.messageService.add("Error during download: " + err);
      }
    );
  }

  onBackup(): void {
    this.thingService.backup()
    .subscribe(res => {
      this.messageService.add("db was saved");
    }, err => {
      this.messageService.add("Error during backup: " + err);
    })
  }
}
