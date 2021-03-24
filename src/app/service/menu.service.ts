import { isPlatformBrowser } from '@angular/common';
import { HttpClient } from '@angular/common/http';
import { Inject, Injectable, PLATFORM_ID } from '@angular/core';
import { Observable } from 'rxjs';
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
}
