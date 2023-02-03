import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { Heroe } from '../interfaces/heroe.interface';

@Injectable({
  providedIn: 'root'
})
export class HeroesService {

  private baseuUl: string = environment.baseUrl;

  constructor(private http: HttpClient) { }

  getHeroesA(): Observable<Heroe[]> {
    return this.http.get<Heroe[]>(`${this.baseuUl}/heroes`);
  }

  getHeroePorId(id: string): Observable<Heroe> {
    return this.http.get<Heroe>(`${this.baseuUl}/heroes/${id}`);
  }

  getSugerencia(termino: string): Observable<Heroe[]> {
    const params = new HttpParams()
      .set("q", termino)
      .set("_limit", "6");

    return this.http.get<Heroe[]>(`${this.baseuUl}/heroes`, {
      params
    });
  }

}
