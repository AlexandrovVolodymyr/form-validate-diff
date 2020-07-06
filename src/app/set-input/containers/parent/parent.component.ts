import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-parent',
  templateUrl: './parent.component.html',
  styleUrls: ['./parent.component.scss']
})
export class ParentComponent implements OnInit {

  value: string;

  constructor() { }

  ngOnInit(): void {
  }

  change(value: any) {
    console.log('ngModelChange', value);
  }
}
