import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { tap } from 'rxjs';
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

  login() {
    return this.http.get<Usuario>(`${this.baseUrl}/usuarios/1`).
      pipe(tap(resp => {
        this._user = resp;
      })
      );
  }

  logout() {
    this._user = undefined;
  }
}
