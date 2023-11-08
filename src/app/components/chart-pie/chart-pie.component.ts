import { Component, OnDestroy, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { OlympicService } from 'src/app/core/services/olympic.service';
import Olympic from 'src/app/core/models/olympic.model';
import DataChart from '../../core/models/data-pie-chart.model';
import Header from '../../core/models/header.model';

@Component({
  selector: 'app-chart-pie',
  templateUrl: './chart-pie.component.html',
  styleUrls: ['./chart-pie.component.scss'],
})
export class ChartPieComponent implements OnInit, OnDestroy {
  olympics!: Olympic[];
  totalJo!: number;
  dataChart!: DataChart[];
  header!: Header;

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
    this.subscription.push(
      this.olympicService.getOlympics().subscribe((result) => {
        if (result) {
          this.initData();
          this.header = {
            title: 'Medals per Country',
            indicator: [
              {
                label: 'Number of JOs',
                total: this.totalJo,
              },
              {
                label: 'Number of countries',
                total: this.olympics.length,
              },
            ],
          };
        }
      })
    );
  }

  public ngOnDestroy() {
    this.subscription.forEach((element) => element.unsubscribe());
  }

  /**
   * La fonction 'initData' contient toutes les fonctions du service nécessaires
   * pour le démarrage de la page d'accueil.
   */
  private initData(): void {
    this.subscription.push(
      this.olympicService
        .getTotalJo()
        .subscribe((totalJo) => (this.totalJo = totalJo))
    );

    this.subscription.push(
      this.olympicService
        .getOlympics()
        .subscribe((olympic) => (this.olympics = olympic))
    );

    this.subscription.push(
      this.olympicService
        .getDataPieChart()
        .subscribe((data) => (this.dataChart = data))
    );
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
}
