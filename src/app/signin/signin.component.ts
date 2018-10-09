import { Component, OnInit } from '@angular/core';
import {DomSanitizer} from '@angular/platform-browser';
import { Router } from '@angular/router';
import { catchError, map, tap } from 'rxjs/operators';
import { Observable } from 'rxjs';
import PlantifyUser from '../schema/user';
import { AuthService } from '../_services/auth.service';
import { FormControl, Validators } from '@angular/forms';
import { MatIconRegistry } from '@angular/material';
import { MatSnackBar } from '@angular/material';
import { NotifyService } from '../_services/notify.service';
import { NgModule }      from '@angular/core';


@Component({
  selector: 'app-signin',
  templateUrl: './signin.component.html',
  styleUrls: ['./signin.component.css']
})
export class SigninComponent implements OnInit {

  bgUrl = 'http://backgroundcheckall.com/wp-content/uploads/2017/12/background-images-for-registration-page-10.jpg';
  email = '';
  password = '';
  confirmPassword = '';
   user =new PlantifyUser();
   loading = false;

   emailFormControl = new FormControl('', [
    Validators.required,
    Validators.email,
  ]);
 passwordFormControl = new FormControl('', [
    Validators.required,
    Validators.minLength(6),
  ]);
  confirmPasswordFormControl = new FormControl('', [
    Validators.required,
    Validators.minLength(6)

  ]);

  
  constructor(private authService: AuthService,
    private notifyService: NotifyService,
    private router: Router, public snackBar: MatSnackBar) { }


    ngOnInit() {
      // this.authService.getLoggedInUpdates().subscribe((user) => {
      //   if (user != null) {
      //     // this.router.navigate(['/explore']);
      //   }
      //   console.log(user);
      // });
  
  
    }
    signin() {
      this.loading = true;
      this.authService.emailLogin(this.user.email, this.password)
        .then(result => {
          console.log(result);
          if (result) {
  
            this.loading = false;
            this.router.navigate(['']);
          }
  
          this.loading = false;
        })
        .catch(err => {
          this.loading = false;
          console.log(err);
        });
  
    }
  
    signinGoogle() {
      this.loading = true;
      this.authService.googleLogin();
    }
  
  
    signup() {
      this.loading = true;
      this.authService.emailSignUp(this.user, this.password)
        .then(() => {
  
          this.router.navigate(['']);
  
          this.loading = false;
        })
        .catch(err => {
          this.loading = false;
          console.log(err);
        });
    }
  
  
  
  }


