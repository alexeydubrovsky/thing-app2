import { Component, OnInit } from '@angular/core';

import { FormBuilder, FormGroup, FormControl, Validators } from '@angular/forms';

import { Router } from '@angular/router';

import { ThingService } from '../thing.service';
import { Thing } from '../thing';

const listURI = "/things";

@Component({
  selector: 'app-thing-create',
  templateUrl: './thing-create.component.html',
  styleUrls: ['./thing-create.component.css']
})
export class ThingCreateComponent implements OnInit {

  createForm = new FormGroup({
    name: new FormControl('', [ Validators.required, Validators.minLength(4) ] ),
    email: new FormControl('', Validators.email),
    created: new FormControl(''),
    rate: new FormControl('4', [ Validators.min(1), Validators.max(5) ]),
    description: new FormControl('')
  });

  submitted = false;

  constructor(private router: Router, private thingService: ThingService) {
  }

  ngOnInit(): void {
  }

  submit(): void {
    if (this.createForm.invalid || this.submitted) {
      return;
    }
    let thing: Thing = {
      id: undefined,
      name: this.createForm.get("name").value,
      email: this.createForm.get("email").value,
      created: this.createForm.get("created").value,
      rate: this.createForm.get("rate").value,
      description: this.createForm.get("description").value,
    };
    this.createForm.reset();
    console.log("before call...");
    this.thingService.createNew(thing)
       .subscribe(
         () => {
           console.log("...after call");
           this.submitted = true;
           this.router.navigate([listURI]);
         },
         error => console.error("...call error")
       );
  }

  onReset(): void {
    this.createForm.reset();
  }

  onAdd(): void {
    this.submitted = false;
  }

}
