import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { environment } from 'src/environments/environment.prod';
import { EncryptionServiceService } from './encryption-service.service';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  public toster: any = {};
  public avail: boolean = false;
  public msg: string = "";
  public count: any;
  public data: any;
  private headers = new HttpHeaders().set('Content-Type', 'application/json');
  constructor(private encryptionService: EncryptionServiceService, private http: HttpClient, private router: Router) { }


  register(body: any) {
    return this.http.post(environment.api + '/api/auth/register', body, {
      observe: 'body',
      headers: new HttpHeaders().append('Content-Type', 'application/json')
    });
  }

  login(body: any) {
    console.log(environment.api);
    return this.http.post(environment.api+ '/api/auth/login', body, {
      observe: 'body',
      headers: new HttpHeaders().append('Content-Type', 'application/json')
    });
  }

  loggedIn() {
    return !!localStorage.getItem('token')
  }

  getToken() {
    console.log(localStorage.getItem('data')!);
    if (localStorage.getItem('data') != null) {
      this.data = this.encryptionService.decrypt(localStorage.getItem('data')!);
      console.log(this.data);
      return this.data["token"];

    }
    return null;

  }

  logoutUser() {
    localStorage.removeItem('data');

    this.router.navigate(['/'])
  }

  check() {
    return this.http.get(environment.api + "api/auth/check", { headers: this.headers });
  }

  reset(body: any) {
    return this.http.post(environment.api+ 'api/auth/reset', body, {
      observe: 'body',
      headers: new HttpHeaders().append('Content-Type', 'application/json')
    });
  }

  resetpassworddone(body: any) {

    return this.http.post(environment.api + 'api/auth/reset-password-done', body, {
      observe: 'body',
      headers: new HttpHeaders().append('Content-Type', 'application/json')
    });
  }
  otp(body: any) {

    return this.http.post(environment.api + 'api/auth/otp', body, {
      observe: 'response',
      headers: new HttpHeaders().append('Content-Type', 'application/json')
    });
  }

  changepassword(body: any) {
    return this.http.post(environment.api + 'api/auth/change-password', body, {
      observe: 'body',
      headers: new HttpHeaders().append('Content-Type', 'application/json')
    });
  }


  setCount(c: number) {
    this.count = c;
  }

  getCount() {
    return this.count;
  }


  setMessage(msg: any, color: any) {
    this.toster.msg = msg;
    this.toster.color = color;
    setTimeout(() => {
      this.toster = {};
    }, 4000);
  }

  getMessage() {
    return this.toster;
  }
}
