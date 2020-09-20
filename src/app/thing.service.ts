import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

import { Observable, of } from 'rxjs';
import { map } from 'rxjs/operators';

import { Thing } from './thing';

const thingApiUrl = 'http://localhost:8080/api/things';

@Injectable({
  providedIn: 'root'
})
export class ThingService {

  things: Thing[] = [];
  selectedThing: Thing;

  constructor(private http: HttpClient) { }

  selectThing(thing: Thing): void {
    this.selectedThing = thing;
  }

  getSelectedThing(): Observable<Thing> {
    return of(this.selectedThing);
  }

  getThings(): Observable<any> {
    return this.http.get(thingApiUrl);
  }

  getThing(id: String): Observable<Thing> {
    return of(this.things.find(thing => thing.id === id));
  }

  createNew(thing: Thing): Observable<any> {
    return this.http.post(thingApiUrl, thing);
  }

  download(): Observable<Blob> {
    return this.http.get(thingApiUrl + "/download", {
      responseType: 'blob'
    })
  }

  backup(): Observable<any> {
    return this.http.get(thingApiUrl + "/backup");
  }


}
