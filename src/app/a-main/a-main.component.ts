import { Component, OnInit } from '@angular/core';
import { MainService } from '../_services/main.service';
import { AuthService } from '../_services/auth.service';

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

  noOfAssignments:any ;
  pageSize:any ;
  pageSizeOptions:any[] = [20];
  loading:any=true;
  isLoggedIn = false;
 

  constructor(public mainService:MainService,public authService:AuthService) { }

  ngOnInit() {
    this.mainService.getCollection("articles")
    .then(list => {
      this.articlesList = list;
    //  console.log(this.articlesList);
      
      return "got documents from database";
    })
    .then(temp => {
        console.log(temp);
        
    })
    .catch(err => {
        console.log(err);
    });


    this.authService.getLoggedInUpdates().subscribe(user=> {
        if(user==null || user==undefined){
          this.isLoggedIn = false;
        }
        else {
          this.isLoggedIn = true;
        }
    });

  }



}
