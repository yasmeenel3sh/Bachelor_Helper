import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { of } from 'rxjs';
import { HttpClient, HttpHeaders } from '@angular/common/http';
@Injectable()
export class SearchService {
  constructor(private http: HttpClient) { }
// searching for users with the specified tags
  getUsers(tags: string[]): Observable<any> {

    return this.http.get<any>(`http://localhost:4200/Search/` + tags[0] + '/' + tags[1] + '/'  + tags[2]);
  }
// to be done
// viewing the profile clicked on
  viewProfile(term: string): Observable<any> {
    if (!term.trim()) {
      return of([]);
      }
    return this.http.get<any>(`http://localhost:4200/profile/` + term);
  }
}
