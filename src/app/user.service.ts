import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from "@angular/common/http";
import { Observable } from "rxjs";
import { EncryptionServiceService } from './encryption-service.service';
import { environment } from 'src/environments/environment.prod';

@Injectable({
  providedIn: 'root'
})
export class UserService {
  data: any;

  constructor(private encryptionService: EncryptionServiceService, private httpclient: HttpClient) { }

 


  getPubByEmail(): Observable<any> {
    this.data = this.encryptionService.decrypt(localStorage.getItem('data')!);
    console.log(this.data);
    let headers = new HttpHeaders({
      'Content-Type': 'application/json',
      'responseType': 'json',
      'id': this.data["token"]!,

    });
    return this.httpclient.get(environment.api+"/api/users/alleq", { headers: headers });
  }
  updateUser(data:any): Observable<any> {
    this.data = this.encryptionService.decrypt(localStorage.getItem('data')!);
    console.log(this.data);
    let headers = new HttpHeaders({
      'Content-Type': 'application/json',
      'responseType': 'json',
      'id': this.data["token"]!,
    });
    return this.httpclient.put(environment.api+"/api/users/update",data, { headers: headers });
  }
}
