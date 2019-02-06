import { Component, OnInit } from '@angular/core';
import { MainService } from '../_services/main.service';
import { AuthService } from '../_services/auth.service';

@Component({
  selector: 'app-side-bar',
  templateUrl: './side-bar.component.html',
  styleUrls: ['./side-bar.component.css']
})
export class SideBarComponent implements OnInit {

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
    localStorage.clear();
    
    this.authService.logOut()
    
  }
}
