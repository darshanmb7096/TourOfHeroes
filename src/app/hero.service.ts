import { Injectable } from '@angular/core';
import { Hero } from './hero';
import { HEROES } from './mock-heroes';
import { Observable, of, throwError } from 'rxjs';
import { catchError, tap } from 'rxjs/operators';
import { HttpClient, HttpHeaders} from '@angular/common/http'

@Injectable({
  providedIn: 'root'
})
export class HeroService {
  
  heroesurl : string = "https://localhost:7244/api/Hero/Hero";

  AddHerourl : string = "https://localhost:7244/api/Hero/AddHero"

  deleteHeroUrl :string = "https://localhost:7244/api/Hero/delete/id"

  private handleError<T>(operation = 'operation', result?: T) {
    return (error: any): Observable<T> => {
      console.error(error);
      // You can perform additional error handling tasks here, such as logging or displaying an error message to the user.
      return throwError(result as T);
    };
  }
  
  
  GetHeroes(): Observable<any> {
    return this.http.get<any>(this.heroesurl);
  }


  OnAddHero(Id: any, Name: any): Observable<any> {
    const hero: any = { Id, Name };
    const headers = new HttpHeaders().set('Content-Type', 'application/json; charset=utf-8');
    
    return this.http.post(this.AddHerourl, hero, { headers });
  }

  deleteHero(heroId: number): Observable<any> {
    const url = `${this.deleteHeroUrl}/DeleteHero/${heroId}`;
    return this.http.delete(url).pipe(
      tap(res => {
        alert("hero deleted")
      }),
      catchError(this.handleError('deleteHero', null))
    );
  }

  constructor(private http : HttpClient) { }
}
