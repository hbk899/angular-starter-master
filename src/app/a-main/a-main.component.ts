import { Component, OnInit } from '@angular/core';
import { MainService } from '../_services/main.service';

@Component({
  selector: 'app-a-main',
  templateUrl: './a-main.component.html',
  styleUrls: ['./a-main.component.css']
})
export class AMainComponent implements OnInit {

  articlesList:any[];
  constructor(public mainService:MainService) { }

  ngOnInit() {
    this.mainService.getCollection("articles")
    .then(list => {
      this.articlesList = list;
      console.log(this.articlesList);
      
      return "tempor";
    })
    .then(temp => {
        console.log(temp);
        
    })
    .catch(err => {
        console.log(err);
    });
  }



}
