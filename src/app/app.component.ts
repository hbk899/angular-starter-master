import { Component } from '@angular/core';
import { Router, NavigationEnd } from '@angular/router';

import { MatSnackBar, MatDialog } from '@angular/material';
import { AuthService } from './_services/auth.service';
import PlantifyUser from './schema/user';
import {MediaMatcher} from '@angular/cdk/layout';
import {ChangeDetectorRef, OnDestroy} from '@angular/core';
@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'Plantify.com';
  user = new PlantifyUser;
  username: any = '';
  userId: any;
  profileUrl: any;
  isDoctor = false;
  loggedIn: any = false;
  notloggedIn: any = true;
  loading:any=false;
  sideNavOpened = false;
  sideNavMode = 'over';
  isMobile = false;
  constructor(private router: Router,
    public snackBar: MatSnackBar,
    public dialog: MatDialog,
    private authService: AuthService) { }
    ngOnInit() {
      this.loading=true;
      this.router.events.subscribe((evt) => {
        if (!(evt instanceof NavigationEnd)) {
          return;
        }
        window.scrollTo(0, 0);
      });
  
      this.resubscribe();
  
      this.authService.getLoggedInUpdates().subscribe((authUser) => {
        this.resubscribe();
        if (authUser != null) {
          this.loggedIn = true;
          this.notloggedIn = false;
          this.username=this.user.displayName;
        } else {
          this.sideNavOpened = false;
        }
  
      });
  
  
      this.refresh();
      this.loading= false;
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
    this.sideNavMode = 'closed';
  } else {
    this.sideNavMode = 'over';
    this.sideNavOpened = false;
    this.isMobile = true;
  }
}


resubscribe() {
  this.loading=true
  console.log('resubscribing');

  this.authService.getCurrentUserUpdates().subscribe((user) => {
    if (!user) {
      return;
    }
   

    this.user = user;
    console.log(user);
    this.loading=false;
  });
}

logout() {
 
  localStorage.clear();
  this.userId = 0;
  this.loggedIn = false;
  this.notloggedIn = true;
  this.username = '';
  this.authService.logOut()
}

}
