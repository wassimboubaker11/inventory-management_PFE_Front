import { Component, OnInit, Inject, Output, EventEmitter } from '@angular/core';
import { DOCUMENT } from '@angular/common';
import { CookieService } from 'ngx-cookie-service';
import { Router } from '@angular/router';

import { AuthenticationService } from '../../../core/services/auth.service';
import { AuthfakeauthenticationService } from '../../../core/services/authfake.service';
import { LanguageService } from '../../../core/services/language.service';
import { environment } from '../../../../environments/environment';
import { AdminService } from 'src/app/core/services/admin.service';
import { GestionaireService } from 'src/app/core/services/gestionaire.service';
import { User } from 'src/app/core/models/auth.models';

@Component({
  selector: 'app-topbar',
  templateUrl: './topbar.component.html',
  styleUrls: ['./topbar.component.scss']
})
export class TopbarComponent implements OnInit {

  user:any;
  role:any
  admin:any
  picture:any
  gestionaire:any
  ta5tarphoto:String;

  element: any;
  configData: any;
  cookieValue;
  flagvalue;
  countryName;
  valueset: string;

  listLang = [
    { text: 'English', flag: 'assets/images/flags/us.jpg', lang: 'en' },
    { text: 'Spanish', flag: 'assets/images/flags/spain.jpg', lang: 'es' },
    { text: 'German', flag: 'assets/images/flags/germany.jpg', lang: 'de' },
    { text: 'Italian', flag: 'assets/images/flags/italy.jpg', lang: 'it' },
    { text: 'Russian', flag: 'assets/images/flags/russia.jpg', lang: 'ru' },
  ];

  // tslint:disable-next-line: max-line-length
  constructor(private adminservice:AdminService , private gestionaireservice:GestionaireService, @Inject(DOCUMENT) private document: any, private router: Router, private authService: AuthenticationService, private authFackservice: AuthfakeauthenticationService, public languageService: LanguageService, public cookiesService: CookieService) { }

  @Output() mobileMenuButtonClicked = new EventEmitter();
  @Output() settingsButtonClicked = new EventEmitter();

  ngOnInit(): void {
    this.element = document.documentElement;
    this.configData = {
      suppressScrollX: true,
      wheelSpeed: 0.3
    };

    this.cookieValue = this.cookiesService.get('lang');
    const val = this.listLang.filter(x => x.lang === this.cookieValue);
    this.countryName = val.map(element => element.text);
    if (val.length === 0) {
      if (this.flagvalue === undefined) { this.valueset = 'assets/images/flags/us.jpg'; }
    } else {
      this.flagvalue = val.map(element => element.flag);
    }

  


    this.getUserDATAFromToken();
    
    //console.log(this.role)
    this.afficherimage()
    //console.log(this.picture)

      
  }



  getUserDATAFromToken(){
    let token = localStorage.getItem('token');
    if(token){
      let data = JSON.parse(window.atob(token.split('.')[1]))
      this.user=data
      this.role=this.user.Role
      return data;
      
    }  }

    afficherimage(){
      if(this.user.Role == 'ADMIN'){
        this.adminservice.getadminbyemail(this.user.sub).subscribe(
          responce=>{
            this.admin=responce
            this.picture=this.admin.logo
           // console.log(this.admin);
            this.ta5tarphoto="http://localhost:8081/api/v1/file/files/" +this.picture;
          },
          err=>{
            console.log(err)
          }
        )
      }else{
        if(this.user.Role =='USER'){
          this.gestionaireservice.getgestionairebyemail(this.user.sub).subscribe(
            responce=>{
              this.gestionaire=responce
              this.picture=responce.photo
              //console.log(responce);
              this.ta5tarphoto="http://localhost:8081/api/v1/file/files/" +this.picture;
            },
            err=>{
              console.log(err)
            }
          )
        }else if(this.user.Role =='SUPER_ADMIN'){
            this.ta5tarphoto="assets/images/1580806939517.jpg";
          
        }
      }
    }


























  /**
   * Toggle the menu bar when having mobile screen
   */
  toggleMobileMenu(event: any) {
    event.preventDefault();
    this.mobileMenuButtonClicked.emit();
  }

  /**
   * Toggles the right sidebar
   */
  toggleRightSidebar() {
    this.settingsButtonClicked.emit();
  }

  /**
   * Fullscreen method
   */
  fullscreen() {
    document.body.classList.toggle('fullscreen-enable');
    if (
      !document.fullscreenElement && !this.element.mozFullScreenElement &&
      !this.element.webkitFullscreenElement) {
      if (this.element.requestFullscreen) {
        this.element.requestFullscreen();
      } else if (this.element.mozRequestFullScreen) {
        /* Firefox */
        this.element.mozRequestFullScreen();
      } else if (this.element.webkitRequestFullscreen) {
        /* Chrome, Safari and Opera */
        this.element.webkitRequestFullscreen();
      } else if (this.element.msRequestFullscreen) {
        /* IE/Edge */
        this.element.msRequestFullscreen();
      }
    } else {
      if (this.document.exitFullscreen) {
        this.document.exitFullscreen();
      } else if (this.document.mozCancelFullScreen) {
        /* Firefox */
        this.document.mozCancelFullScreen();
      } else if (this.document.webkitExitFullscreen) {
        /* Chrome, Safari and Opera */
        this.document.webkitExitFullscreen();
      } else if (this.document.msExitFullscreen) {
        /* IE/Edge */
        this.document.msExitFullscreen();
      }
    }
  }

  /**
   * Translate language
   */
  setLanguage(text: string, lang: string, flag: string) {
    this.countryName = text;
    this.flagvalue = flag;
    this.cookieValue = lang;
    this.languageService.setLanguage(lang);
  }


  /**
   * Logout the user
   */
  logOut(){
    this.authService.logOut();
    this.router.navigate(['/account/login']);

}
}
