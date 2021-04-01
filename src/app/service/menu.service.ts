import { isPlatformBrowser } from '@angular/common';
import { HttpClient } from '@angular/common/http';
import { Inject, Injectable, PLATFORM_ID } from '@angular/core';
import * as e from 'express';
import { Observable } from 'rxjs';
import { ArticleData } from '../interfaces/articleData';
import { CommentData } from '../interfaces/comment';
import { Message } from '../interfaces/message';
import { PageData } from '../interfaces/pageData';
import { UserData } from '../interfaces/userData';

@Injectable({
  providedIn: 'root'
})
export class MenuService {
  
  testBrowser: boolean;
  userData: UserData  = {
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

  constructor(private _http: HttpClient, @Inject(PLATFORM_ID) private platformId: any) { 
    this.testBrowser = isPlatformBrowser(platformId);
  }

  getPage(pageName: string) {
    if(this.testBrowser) {
      return this._http.get<PageData>('/api/pages/' + pageName, {
        headers: {
          'Cache-Control' : 'no-cache'
        }
      })
    } else { 
      return new Observable<PageData>();
    }
  }

  setUser(user: UserData) {
    this.userData = user
  }

  getUser(): UserData {
    return this.userData
  }

  getArticles() {
    if(this.testBrowser) {
      return this._http.get<ArticleData[]>('/api/articles', {
        headers: {
          'Cache-Control' : 'no-cache'
        }
      })
    } else { 
      return new Observable<ArticleData[]>();
    }
  }

  getArticleById(id: string) {
    if(this.testBrowser) {
      return this._http.get<ArticleData>('/api/articles/' + id);
    } else {
      return new Observable<ArticleData>();
    }
  }

  postComment(id: string, comment: CommentData) {
    if(this.testBrowser) {
      return this._http.post<Message>('/api/post/comment/' + id + '/?jwt=' + localStorage.getItem('access_token'), comment);
    } else {
      return new Observable<Message>();
    }
  }
  isBlogger(): boolean {
    if(this.userData.accessToken !== '') {
      return this.userData.roles.map(roles=> roles.role).includes('admin') || this.userData.roles.map(roles=> roles.role).includes('blogger')
    } else {
      return false
    }
  }

  postNewBlog(blog: ArticleData) {
    if(this.testBrowser) {
      return this._http.post<Message>('/api/post/articles/?jwt=' + localStorage.getItem('access_token') + '&id=' + localStorage.getItem('id'), blog);
    } else {
      return new Observable<Message>();
    }
  }
}
