import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-child',
  templateUrl: './child.component.html',
  styleUrls: ['./child.component.scss']
})
export class ChildComponent implements OnInit {

  age: number

  @Input() set value(value: string) {
    if (+value > 0) {
      this.age = +value;
    } else {
      this.age = 0;
    }
  };

  constructor() { }

  ngOnInit(): void {
  }

}
