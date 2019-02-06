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
  isMobile: boolean;
  sideNavOpened: boolean;
  sideNavMode: string;

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

refresh() {

  const w = window,
    d = document,
    e = d.documentElement,
    g = d.getElementsByTagName('body')[0],
    x = w.innerWidth || e.clientWidth || g.clientWidth,
    y = w.innerHeight || e.clientHeight || g.clientHeight;


  console.log(x);

  if (x > 600) {

    this.isMobile = false;
    this.sideNavOpened = false;
    this.sideNavMode = 'over';
  } else {
    this.sideNavMode = 'over';
    this.sideNavOpened = false;
    this.isMobile = true;
  }
}

}