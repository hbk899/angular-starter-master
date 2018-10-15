
import { MainService } from '../_services/main.service';
import { AuthService } from '../_services/auth.service';

import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Observable, Subject, of } from 'rxjs';
//import { AuthService } from '../_services/auth.service';
import { Upload } from '../_services/upload';
import { NotifyService } from '../_services/notify.service';

import { MatChipInputEvent, MatAutocompleteSelectedEvent } from '@angular/material';
import { FormControl } from '@angular/forms';
import { ENTER, COMMA, SPACE } from '@angular/cdk/keycodes';
import { MouseEvent, AgmMarker } from '@agm/core';
import { Marker } from '@agm/core/services/google-maps-types';
import { ProfileService } from '../_services/profile.service';
import PlantifyUser from '../schema/user';
import { map, startWith, catchError } from 'rxjs/operators';
@Component({
  selector: 'app-articles-my',
  templateUrl: './articles-my.component.html',
  styleUrls: ['./articles-my.component.css']
})


 



export class ArticlesMyComponent implements OnInit {
  userId: string;
  me: boolean;
  loading = false;


  user = new PlantifyUser;
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
  
  isLoggedIn = false;
 
  constructor(private authService: AuthService,
    private route: ActivatedRoute,
    private profileService: ProfileService,
    private notify: NotifyService,
 public mainService:MainService) { }

  ngOnInit() :
    void {

      this.userId = this.route.snapshot.paramMap.get('id');
  
  
  
      this.authService.getCurrentUserUpdates().subscribe((user) => {
  
        if (!user) {
          return;
        }
        if (user.id === this.userId || !this.userId) {
          this.me = true;
          
        } else {
          this.getUser();
          this.me = false;
        }
  
        this.user = user;
        
  
  
      });
  
      this.mainService.getUserCollection("articles",this.userId)
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
  
  
    getUser() {
      this.loading = true;
      this.profileService.getById(this.userId)
        .then(user => {
          this.user = <PlantifyUser>user;
        //  console.log(user);
  
          this.loading = false;
        })
        .catch(err => {
          this.loading = false;
        });
    }
 
    
  

}


