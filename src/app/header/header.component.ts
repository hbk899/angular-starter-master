import { Component, OnInit } from '@angular/core';
import { MainService } from '../_services/main.service';
import { AuthService } from '../_services/auth.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {

  isLoggedIn=false;

  constructor(public mainService:MainService,public authService:AuthService) { }
  
  ngOnInit() {

    this.authService.getLoggedInUpdates().subscribe(user=> {
      if(user==null || user==undefined){
        this.isLoggedIn = false;
      }
      else {
        this.isLoggedIn = true;
      }
  });
  }
  logout() {
    this.authService.logOut();
  }
}
