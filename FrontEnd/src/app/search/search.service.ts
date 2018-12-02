import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { of } from 'rxjs';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { environment } from '../../environments/environment';
@Injectable()
export class SearchService {
  constructor(private http: HttpClient) { }
// searching for users with the specified tags
  getUsers(tags: string[], curr: Number, pp: Number): Observable<any> {

    return this.http.get<any>(environment.domain+'search/' + tags[0] + '/' + tags[1] + '/'  + tags[2] + '/' + curr + '/' + pp);
  }
}
