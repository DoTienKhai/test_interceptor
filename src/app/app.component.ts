import { HttpClient } from '@angular/common/http';
import { Component, ElementRef, HostListener, OnInit, ViewChild } from '@angular/core';
import { KeycloakService } from 'keycloak-angular';
import { NgxSpinnerService } from 'ngx-spinner';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {
  title = 'test-keycloak';
  @ViewChild('btn') btn: ElementRef = new ElementRef(null);

  constructor(
    // private keycloak: KeycloakService
    private http: HttpClient,
    private spinner: NgxSpinnerService
    ){

  }

  ngOnInit(): void {
    this.http.get('/posts').subscribe(data => {
    });
  }


  public logout(){
    this.http.get('/posts').subscribe(data => {
    });
    // this.keycloak.logout();
  }

}
