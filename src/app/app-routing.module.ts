
/*
* This file decides the navigation of the app.
*/



import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
// import { ArifMainComponent } from './arif-main/arif-main.component';
import { AMainComponent } from './a-main/a-main.component';
import { AboutComponent } from './about/about.component';
import {HeaderComponent } from './header/header.component';
import {SigninComponent} from './signin/signin.component';
import {ProfileComponent} from './profile/profile.component';
import {ArticleNewComponent} from './article-new/article-new.component';
const routes: Routes = [

  // { path: '', component: ArifMainComponent },
  { path: 'amain', component: AMainComponent },
  { path: 'about', component: AboutComponent },
  { path :'' , component:HeaderComponent  },
  {path:'signin',component:SigninComponent},
  {path:'articleNew',component:ArticleNewComponent},
  {path:'profile',component:ProfileComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }


/*
Copyright 2017-2018 Google Inc. All Rights Reserved.
Use of this source code is governed by an MIT-style license that
can be found in the LICENSE file at http://angular.io/license
*/
