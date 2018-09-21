import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-about',
  templateUrl: './about.component.html',
  styleUrls: ['./about.component.css']
})
export class AboutComponent implements OnInit {

  constructor() { }

  options: any = {
    lineWrapping: true,
    toolbar: false,

  };

  ngOnInit() {
  }

}
