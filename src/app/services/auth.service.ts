import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { getDefaultLibFilePath } from 'typescript';
import { User } from '../interfaces/user';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  urlApi: string = "http://localhost:8080/api";
  urlApiLogin: string = this.urlApi + "/login";

  constructor(private http: HttpClient) { }

  // metodo de login
  login(user: User) {
    // ta fazendo um post na url do login (enviando os dados do usuario)
    return this.http.post(this.urlApiLogin, user)
      .subscribe(
        // o auth é o nosso token
        (auth: any) => {
          return auth;
        }
      );
  }

  setAuth(token: string) {
    localStorage.setItem('access_token', token);
  }

  getAuth() {
    return localStorage.getItem('access_token');
  }

  logout() {
    return new Promise(resolve => {
        localStorage.removeItem('access_token');
        return resolve(true);
      });
  }

  getHeaderAuth() {
    const header = new HttpHeaders({
      'Accepted' : 'application/json',
      'Authorization' : 'Bearer ' + this.getAuth()
    });
    return header;
  }
}
