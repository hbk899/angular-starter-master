import { Component, OnInit } from '@angular/core';
import { MainService } from '../_services/main.service';

@Component({
  selector: 'app-a-main',
  templateUrl: './a-main.component.html',
  styleUrls: ['./a-main.component.css']
})
export class AMainComponent implements OnInit {

  articlesList:any[];


  tasks:any[] = [
    // {dpurl:'https://s.ndtvimg.com/images/entities/120/kane-williamson-1058.png',title:'Android Layout Design',description:'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nullam vel dui id nibh luctus pharetra. Morbi placerat, turpisit amet interdum ultrices, sapien mauris maximus arcu'},
    // {dpurl:'https://s.ndtvimg.com/images/entities/120/kane-williamson-1058.png',title:'Write a letter',description:'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nullam vel dui id nibh luctus pharetra. Morbi placerat, turpisit amet interdum ultrices, sapien mauris maximus arcu'},
    // {dpurl:'https://s.ndtvimg.com/images/entities/120/kane-williamson-1058.png',title:'Make a mathematical model',description:'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nullam vel dui id nibh luctus pharetra. Morbi placerat, turpisit amet interdum ultrices, sapien mauris maximus arcu'},
    // {dpurl:'https://s.ndtvimg.com/images/entities/120/kane-williamson-1058.png',title:'Android Layout Design',description:'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nullam vel dui id nibh luctus pharetra. Morbi placerat, turpisit amet interdum ultrices, sapien mauris maximus arcu'},
    // {dpurl:'https://s.ndtvimg.com/images/entities/120/kane-williamson-1058.png',title:'Android Layout Design',description:'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nullam vel dui id nibh luctus pharetra. Morbi placerat, turpisit amet interdum ultrices, sapien mauris maximus arcu'},

  ];

  noOfAssignments:any = 1;
  pageSize:any = 1;
  pageSizeOptions:any[] = [20];
  loading:any=true;

  constructor(public mainService:MainService) { }

  ngOnInit() {
    this.mainService.getCollection("articles")
    .then(list => {
      this.articlesList = list;
    //  console.log(this.articlesList);
      
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
