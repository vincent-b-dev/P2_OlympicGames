import { Component, OnDestroy } from '@angular/core';
import { Router } from '@angular/router';
import { map, Subscription } from 'rxjs';
import { OlympicService } from 'src/app/core/services/olympic.service';
import Olympic from 'src/app/core/models/Olympic';
import DataChart from '../../core/models/data-pie-chart';

@Component({
  selector: 'app-chart-pie',
  templateUrl: './chart-pie.component.html',
  styleUrls: ['./chart-pie.component.scss'],
})
export class ChartPieComponent implements OnDestroy {
  olympics!: Olympic[];
  totalJo!: number;
  dataChart!: DataChart[];

  colorScheme = [
    { name: 'Italy', value: '#956065' },
    { name: 'Spain', value: '#b8cbe7' },
    { name: 'Germany', value: '#793d52' },
    { name: 'United States', value: '#89a1db' },
    { name: 'France', value: '#9780a1' },
  ];

  subscription: Subscription[] = [];

  constructor(private olympicService: OlympicService, private router: Router) {}

  public ngOnInit(): void {
    this.getOlympicsData();
    this.getTotalJo();
    this.getDataChart();
  }

  public ngOnDestroy() {
    this.subscription.forEach((element) => element.unsubscribe());
  }

  /**
   * Récupère l'ID de l'élément sélectionné, puis redirige à la page detail.
   * @param event
   */

  public goToDetail(event: {
    name: string;
    value: number;
    label: string;
  }): void {
    const selectCountry = this.olympics.find(
      (olympic) => olympic.country === event.name
    );

    if (selectCountry) {
      this.router.navigate(['/detail', selectCountry.id]);
    }
  }

  /**
   * Récupère les données à afficher
   */

  private getOlympicsData(): void {
    this.subscription.push(
      this.olympicService
        .getOlympics()
        .subscribe((olympic) => (this.olympics = olympic))
    );
  }

  /**
   * Tri les données et récupère le total de participations aux Jeux olympiques
   */

  private getTotalJo(): void {
    this.subscription.push(
      this.olympicService
        .getOlympics()
        .pipe(
          map((elements) =>
            elements.reduce((acc, val) => acc + val.participations.length, 0)
          )
        )
        .subscribe((totalJo) => (this.totalJo = totalJo))
    );
  }

  /**
   * Récupère les données pour les afficher dans le graphique
   */

  private getDataChart(): void {
    this.subscription.push(
      this.olympicService
        .getOlympics()
        .pipe(
          map((elements) => {
            return elements.map((el) => ({
              name: el.country,
              value: el.participations.reduce(
                (acc, element) => acc + element.medalsCount,
                0
              ),
            }));
          })
        )
        .subscribe((dataChart) => {
          this.dataChart = dataChart;
        })
    );
  }
}
