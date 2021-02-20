import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from "@angular/common/http";
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class HttpService {

  public baseUrl: string = "http://localhost:3000/";
  public records: string = "transactions";
  public customerRecords: string = "customers";

  constructor(public http: HttpClient) { }

  /**
   * Ajax call for all APIs
   * 
   */
  ajaxCall(pUrl, pType, pData): Observable<any> {
    let headers = new HttpHeaders({ "Content-Type": "application/json" });
    switch (pType) {
      case 'get':
        //get return type
        return this.http.get(pUrl);

      case 'post':
        //post return type
        return this.http.post(pUrl, pData, { headers: headers });
    }
  }
}
