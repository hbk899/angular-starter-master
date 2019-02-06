

import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Location } from '@angular/common';
import { HttpEventType, HttpResponse } from '@angular/common/http';
import { Observable, Subject, of } from 'rxjs';

import { Router } from '@angular/router';
import { MarkdownModule } from 'ngx-markdown';
import { map, startWith, catchError } from 'rxjs/operators';


import { dataURItoBlob } from '../_util/filesUtil';
import { UserService } from '../_services/user.service';


import {
  debounceTime, distinctUntilChanged, switchMap
} from 'rxjs/operators';

import { UploadEvent, UploadFile, FileSystemDirectoryEntry, FileSystemFileEntry } from 'ngx-file-drop';
import { AuthService } from '../_services/auth.service';
import { Upload } from '../_services/upload';
import { NotifyService } from '../_services/notify.service';

import { MatChipInputEvent, MatAutocompleteSelectedEvent } from '@angular/material';
import { FormControl } from '@angular/forms';
import { ENTER, COMMA, SPACE } from '@angular/cdk/keycodes';
import { MouseEvent, AgmMarker } from '@agm/core';
import { Marker } from '@agm/core/services/google-maps-types';
import { ProfileService } from '../_services/profile.service';
import PlantifyUser from '../schema/user';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css']
})
export class ProfileComponent implements OnInit {




  userId: string;
  me: boolean;



  user = new PlantifyUser;
  //isTryingToDoctor = false;
  dpUpload: Upload;
  logoUpload: Upload;
  usersr: string;

  dpChangedEvent: any = '';
  logoChangedEvent: any = '';
  croppedImage: any = '';

  defaultDp = '/assets/dp-placeholder.png';

  separatorKeysCodes = [ENTER, COMMA, SPACE];

  loading = false;
  

  eduTags: string[] = [];

  allEduTags = [
    'computers',
    'writing',
    'accounting',
    'angular',
    'android-developement',
    'ios-developement0',
    'maths',
    'physics',
    'digital-logic-design',
    'health',
    'medical-sciences'
  ];
  filteredEduTags: Observable<any[]>;
  eduTagCtrl = new FormControl();

  @ViewChild('tagInput') tagInput: ElementRef;





  lat = 51.673858;
  lng = 7.815982;
  doctorLocation: any = {
    lat: 0,
    lng: 0,
    draggable: true
  };





  constructor(private authService: AuthService,
    private route: ActivatedRoute,
    private profileService: ProfileService,
    private notify: NotifyService,
    private location: Location) {






    this.filteredEduTags = this.eduTagCtrl.valueChanges.pipe(
      startWith(null),
      map((tag: string | null) => tag ? this._filter(tag) : this.allEduTags.slice()));




  }





  ngOnInit(): void {

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

  // changeIsDoctor(event): void {
  //   console.log(this.user.isDoctor);
  //   this.authService.updateIsDoctor(this.user.isDoctor);

  // }

  // updateRxTemplate() {
  //   this.authService.updateRxTemplate(this.user.doctor.rxTemplate, true)
  //     .then(() => {
  //       this.notify.update('template data updated succefully', 'success');
  //       this.loading = false;
  //     })
  //     .catch(err => {
  //       this.notify.update('Template to update', 'error');
  //       this.loading = false;
  //     });
  // }

  uploadDp() {
    this.dpChangedEvent = false;

    console.log(this.croppedImage);

    this.dpUpload = new Upload(this.dataURItoBlob(this.croppedImage));
    const id = this.user.id;
    this.authService.uploadDp(this.dpUpload)
      .then(
        downloadUrl => {
          this.user.dpSrc = downloadUrl;
          this.dpUpload = null;
        }
      )
      .catch(err => {
        console.log(err);
        this.dpUpload = null;
      });

  }



  /** For Dp  */
  fileChangeEventDp(event: any): void {
    if (event.target.files !== undefined && event.target.files.length > 0) {
      this.dpChangedEvent = event;
    } else {
      this.dpChangedEvent = false;
    }

  }
  /** For logo */
  fileChangeEventLogo(event: any): void {
    if (event.target.files !== undefined && event.target.files.length > 0) {
      this.logoChangedEvent = event;
    } else {
      this.logoChangedEvent = false;
    }

  }

  imageCropped(image: string) {
    this.croppedImage = image;
  }
  imageLoaded() {
    // show cropper
  }
  loadImageFailed() {
    // show message
  }

 



  addEdu(event: MatChipInputEvent): void {
    const input = event.input;
    const value = event.value;

    // Add our tag
    if ((value || '').trim()) {
      this.eduTags.push(value.trim());
    }

    // Reset the input value
    if (input) {
      input.value = '';
    }

    this.eduTagCtrl.setValue(null);
  }

  removeEdu(tag: any): void {
    const index = this.eduTags.indexOf(tag);

    if (index >= 0) {
      this.eduTags.splice(index, 1);
    }
  }

  _filter(name: string) {
    return this.allEduTags.filter(tag =>
      tag.toLowerCase().indexOf(name.toLowerCase()) === 0);
  }

  eduSelected(event: MatAutocompleteSelectedEvent): void {
    this.eduTags.push(event.option.viewValue);
    this.tagInput.nativeElement.value = '';
    this.eduTagCtrl.setValue(null);
  }



























  clickedMarker(label: string, index: number) {
    console.log(`clicked the marker: ${label || index}`);
  }

  markerDragEnd(m: any, event: MouseEvent) {
    console.log('dragEnd', m, event);
    this.doctorLocation.lat = event.coords.lat;
    this.doctorLocation.lng = event.coords.lng;
  }


  mapClicked(event: MouseEvent) {
    this.doctorLocation.lat = event.coords.lat;
    this.doctorLocation.lng = event.coords.lng;
  }



  saveProfileData() {
    this.loading = true;
   
    this.authService.updateProfile(this.user)
      .then(result => {
        this.loading = false;
        console.log(" updating data")
      })
      .catch(err => {
        console.log("error updating data")
        this.loading = false;
      });

  }
















  dataURItoBlob(dataURI) {
    // convert base64 to raw binary data held in a string
    // doesn't handle URLEncoded DataURIs - see SO answer #6850276 for code that does this
    const byteString = atob(dataURI.split(',')[1]);
    // separate out the mime component
    const mimeString = dataURI.split(',')[0].split(':')[1].split(';')[0];
    // write the bytes of the string to an ArrayBuffer
    const ab = new ArrayBuffer(byteString.length);
    // create a view into the buffer
    const ia = new Uint8Array(ab);
    // set the bytes of the buffer to the correct values
    for (let i = 0; i < byteString.length; i++) {
      ia[i] = byteString.charCodeAt(i);
    }
    // write the ArrayBuffer to a blob, and you're done
    const blob = new Blob([ab], { type: mimeString });
    return blob;

  }


}