import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { catchError, tap } from 'rxjs/operators';
import { Observable, map } from 'rxjs';
import Olympic from '../models/Olympic.model';

@Injectable({
  providedIn: 'root',
})
export class OlympicService {
  private olympicUrl = './assets/mock/olympic.json';
  private olympics$ = new BehaviorSubject<Olympic[]>([]);

  constructor(private http: HttpClient) {}

  loadInitialData() {
    return this.http.get<Olympic[]>(this.olympicUrl).pipe(
      tap((value) => this.olympics$.next(value)),
      catchError((error: HttpErrorResponse, caught) => {
        alert('Erreur de type: ' + error.status);
        this.olympics$.next([]);
        return caught;
      })
    );
  }

  getOlympics(): Observable<Olympic[]> {
    return this.olympics$.asObservable();
  }

  /**
   * Récupère l'élément par son ID
   * @param id
   * @returns Observable<Olympic | undefined>
   */
  getOlymppicById(id: number): Observable<Olympic | undefined> {
    return this.olympics$.pipe(
      map((element) => element.find((olympic) => olympic.id === id))
    );
  }
}
