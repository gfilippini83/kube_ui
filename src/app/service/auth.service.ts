import { isPlatformBrowser } from '@angular/common';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Inject, Injectable, PLATFORM_ID } from '@angular/core';
import { Router } from '@angular/router';
import * as e from 'express';

import { Observable } from 'rxjs';
import { LoginUser } from '../interfaces/loginUser';
import { Message } from '../interfaces/message';
import { RegisterUser } from '../interfaces/registerUser';
import { UserData } from '../interfaces/userData';
@Injectable({
  providedIn: 'root'
})
export class AuthService {
  // API_URL: string = 'http://localhost:4000';
  headers = new HttpHeaders().set('Content-Type', 'application/json');
  currentUser = {};
  testBrowser: boolean;
  userData: UserData = {
    id: '',
    username: '',
    email: '',
    roles: [
        {
            _id: '',
            role: ''
        }
    ],
    accessToken: ''
  };

  constructor(private httpClient: HttpClient, @Inject(PLATFORM_ID) private platformId: any, private router: Router,){
    this.testBrowser = isPlatformBrowser(platformId);
  }

  register(user: RegisterUser): Observable<Message> {
    if(this.testBrowser) {
      return this.httpClient.post<Message>(`/api/auth/signup`, user)
    } else {
      return new Observable<Message>()
    }
  }

  login(user: LoginUser): Observable<UserData> {
    if(this.testBrowser) {
      return this.httpClient.post<UserData>(`/api/auth/signin`, user)
    } else {
      return new Observable<UserData>();
    }
  }


  isLoggedIn(): boolean {
    if( typeof window !== 'undefined' ){
      let authToken = localStorage.getItem('access_token');
      return (authToken !== null) ? true : false;
    } else {
      return false
    }
  }
  setUser(user: UserData) {
    this.userData = user;
    console.log("THIS IS THE USERDATA:", this.userData)
  }

  authGuardGetUser(): UserData {
    console.log("THIS IS THE USERDATA IN GET!!:", this.userData)
    return this.userData;
  }
  getUser(): Observable<UserData> {
    if(this.testBrowser) {
      return this.httpClient.get<UserData>('/api/user/get/' + localStorage.getItem('id') + '/?jwt=' + localStorage.getItem('access_token'))
    } else {
      return new Observable<UserData>()
    }
  }

  logout() {
    localStorage.removeItem('access_token')
    localStorage.removeItem('id')
    if (localStorage.removeItem('access_token') == null && localStorage.removeItem('id') == null) {
      this.router.navigate(['/']);
    }
  }

}