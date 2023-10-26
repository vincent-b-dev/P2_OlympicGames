import { Component, OnInit, Input, OnDestroy } from '@angular/core';
import { Router } from '@angular/router';
import { Observable, Subscription, map } from 'rxjs';
import { OlympicService } from 'src/app/core/services/olympic.service';
import DataLineChart from 'src/app/core/models/data-line-chart.model';
import Olympic from 'src/app/core/models/olympic.model';

@Component({
  selector: 'app-chart-line',
  templateUrl: './chart-line.component.html',
  styleUrls: ['./chart-line.component.scss'],
})
export class ChartLineComponent implements OnInit, OnDestroy {
  @Input() id!: number;
  data!: Olympic;
  dataChart!: DataLineChart[];
  totalMedals!: number;
  totalAthletes!: number;
  totalParticipations!: number;
  isExist!: boolean;

  // options
  showLabels: boolean = true;
  animations: boolean = true;
  xAxis: boolean = true;
  yAxis: boolean = true;

  subscriptionCheck!: Subscription;
  subscription: Subscription[] = [];

  constructor(private olympicService: OlympicService, private router: Router) {}

  public ngOnInit(): void {
    this.subscriptionCheck = this.checkIsExist().subscribe((result) => {
      if (result) {
        this.getFullData();
        this.getTotalMedals();
        this.getTotalAthletes();
        this.getDataChart();
      } else {
        this.router.navigate(['/']);
      }
    });
  }

  public ngOnDestroy(): void {
    this.subscription.forEach((element) => element.unsubscribe());
    this.subscriptionCheck.unsubscribe();
  }

  /**
   * Vérifie si la donnée existe
   * @returns Observable<boolean>
   */
  private checkIsExist(): Observable<boolean> {
    return this.olympicService
      .getOlymppicById(this.id)
      .pipe(map((result) => Boolean(result)));
  }

  /**
   * Récupère la donnée par son id dans l'url
   */

  private getFullData(): void {
    this.subscription.push(
      this.olympicService.getOlymppicById(this.id).subscribe((result) => {
        if (result) this.data = result;
      })
    );
  }

  /**
   * Trie les données utiles pour créer le graphique
   */
  private getDataChart(): void {
    this.subscription.push(
      this.olympicService.getOlymppicById(this.id).subscribe((result) => {
        if (result) {
          const dataSeriesChart = result.participations.map((element) => {
            const dataForChart: { name: string; value: number } = {
              value: element.medalsCount,
              name: element.year.toString(),
            };
            return dataForChart;
          });

          this.dataChart = [
            {
              name: result.country,
              series: dataSeriesChart,
            },
          ];
        }
      })
    );
  }

  /**
   * Récupère le nombre total d'athlètes
   */
  private getTotalAthletes(): void {
    this.subscription.push(
      this.olympicService
        .getOlymppicById(this.id)
        .pipe(
          map((olympicData) =>
            olympicData?.participations.reduce(
              (acc, val) => acc + val.athleteCount,
              0
            )
          )
        )
        .subscribe((totalAthletes) => {
          if (totalAthletes) this.totalAthletes = totalAthletes;
        })
    );
  }

  /**
   * Récupère le nombre total de médailles
   */
  private getTotalMedals(): void {
    this.subscription.push(
      this.olympicService
        .getOlymppicById(this.id)
        .pipe(
          map((olympicData) =>
            olympicData?.participations.reduce(
              (acc, val) => acc + val.medalsCount,
              0
            )
          )
        )
        .subscribe((totalMedals) => {
          if (totalMedals) this.totalMedals = totalMedals;
        })
    );
  }
}
