import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, tap, of, map } from 'rxjs';
import { environment } from 'src/environments/environment';
import { Usuario } from '../interfaces/usuario.interface';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  private baseUrl: string = environment.baseUrl;
  private _user: Usuario | undefined;

  get user() {
    return { ... this._user };
  }

  constructor(private http: HttpClient) { }

  verificaAuth(): Observable<boolean> {
    if (!localStorage.getItem("id")) return of(false);

    return this.http.get<Usuario>(`${this.baseUrl}/usuarios/1`)
      .pipe(
        map((resp) => {
          this._user = resp;
          return true;
        })
      )
  }

  login() {
    return this.http.get<Usuario>(`${this.baseUrl}/usuarios/1`).
      pipe(
        tap(resp => { this._user = resp; }),
        tap(resp => localStorage.setItem("id", resp.id))
      );
  }

  logout() {
    console.log("aaa");
    localStorage.clear();
    this._user = undefined;
  }
}
