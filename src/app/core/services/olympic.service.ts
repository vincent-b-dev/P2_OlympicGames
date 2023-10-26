import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { catchError, tap } from 'rxjs/operators';
import { Observable, map } from 'rxjs';
import Olympic from '../models/olympic.model';
import DataPieChart from '../models/data-pie-chart.model';
import DataLineChart from '../models/data-line-chart.model';

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

  /**
   * Récupère l'intégralité des données
   * @returns Observable<Olympic[]>
   */
  getOlympics(): Observable<Olympic[]> {
    return this.olympics$.asObservable();
  }

  //////////////////// Page Details ////////////////////

  /**
   * Tri les données et récupère le total de participations aux Jeux olympiques
   */
  getTotalJo(): Observable<number> {
    return this.olympics$.pipe(
      map((elements) =>
        elements.reduce((acc, val) => acc + val.participations.length, 0)
      )
    );
  }

  /**
   *
   * @returns Les données pour le graphique type Pie
   */
  getDataPieChart(): Observable<DataPieChart[]> {
    return this.olympics$.pipe(
      map((elements) => {
        return elements.map((el) => ({
          name: el.country,
          value: el.participations.reduce(
            (acc, element) => acc + element.medalsCount,
            0
          ),
        }));
      })
    );
  }
  //////////////////// Page Details ////////////////////

  /**
   * @param id Récupère le pays par son id
   * @returns Le pays
   */
  getOlymppicById(id: number): Observable<Olympic | undefined> {
    return this.olympics$.pipe(
      map((element) => element.find((olympic) => olympic.id === id))
    );
  }

  /**
   *
   * @param id Récupère le pays par son id
   * @returns Le nombre total d'athlètes
   */
  getTotalAthletes(id: number): Observable<number | undefined> {
    return this.getOlymppicById(id).pipe(
      map((olympicData) =>
        olympicData?.participations.reduce(
          (acc, val) => acc + val.athleteCount,
          0
        )
      )
    );
  }

  /**
   *
   * @param id Récupère le pays par son id
   * @returns Le nombre total de médailles
   */
  getTotalMedals(id: number): Observable<number | undefined> {
    return this.getOlymppicById(id).pipe(
      map((olympicData) =>
        olympicData?.participations.reduce(
          (acc, val) => acc + val.medalsCount,
          0
        )
      )
    );
  }

  /**
   *
   * @param id Récupère le pays par son id
   * @returns Les données pour le graphique de type Line
   */
  getDataLineChart(id: number): Observable<DataLineChart[]> {
    return this.getOlymppicById(id).pipe(
      map((result) => [
        {
          name: result?.country || '',
          series: (result?.participations || []).map((element) => ({
            name: element.year.toString(),
            value: element.medalsCount,
          })),
        },
      ])
    );
  }
}
