import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { AppRoutingModule } from './app-routing.module';
import { DemoMaterialModule } from './material.module';
import { CovalentTextEditorModule } from '@covalent/text-editor';


import { AngularFireModule } from 'angularfire2';
import { AngularFireDatabaseModule } from 'angularfire2/database';
import { MarkdownModule } from 'ngx-markdown';


import { environment } from '../environments/environment';
import { MainService } from './_services/main.service';
import { AngularFirestoreModule } from '../../node_modules/angularfire2/firestore';
import { AMainComponent } from './a-main/a-main.component';
import { AboutComponent } from './about/about.component';
import { SideBarComponent } from './side-bar/side-bar.component';
import { HeaderComponent } from './header/header.component';
import { ArticleNewComponent } from './article-new/article-new.component';
import { AngularFireAuthModule } from 'angularfire2/auth';
import { SigninComponent } from './signin/signin.component';
import { FormsModule } from '@angular/forms';

@NgModule({
  declarations: [
    AppComponent,
    AMainComponent,
    AboutComponent,
    SideBarComponent,
    HeaderComponent,
    ArticleNewComponent,
    SigninComponent
  ],
  imports: [
    AppRoutingModule,
    BrowserModule,
    BrowserAnimationsModule,
    DemoMaterialModule,
    AngularFireModule.initializeApp(environment.firebase, 'tobechangedfornotifications'),
    AngularFireAuthModule, // imports firebase/auth, only needed for auth features,
    AngularFirestoreModule.enablePersistence(), // imports firebase/firestore, only needed for database features
    MarkdownModule.forRoot(),
    CovalentTextEditorModule,
    FormsModule

  ],
  providers: [MainService],
  
  bootstrap: [AppComponent]
})
export class AppModule { }
