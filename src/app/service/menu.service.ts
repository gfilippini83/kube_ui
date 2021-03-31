import { isPlatformBrowser } from '@angular/common';
import { HttpClient } from '@angular/common/http';
import { Inject, Injectable, PLATFORM_ID } from '@angular/core';
import * as e from 'express';
import { Observable } from 'rxjs';
import { ArticleData } from '../interfaces/articleData';
import { PageData } from '../interfaces/pageData';
import { TestData } from '../interfaces/test';

@Injectable({
  providedIn: 'root'
})
export class MenuService {
  
  testBrowser: boolean;

  constructor(private _http: HttpClient, @Inject(PLATFORM_ID) private platformId: any) { 
    this.testBrowser = isPlatformBrowser(platformId);
  }

  getTest(): Observable<TestData> {
    if(this.testBrowser) {
      return this._http.get<TestData>('/api/test', {
        headers: {
          'Cache-Control' : 'no-cache'
        }
      })
    } else { 
      return new Observable<TestData>();
    }
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
}
