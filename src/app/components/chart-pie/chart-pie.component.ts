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
  olympics$!: Olympic[];
  totalJo!: number;
  dataChart!: DataChart[];
  test: string = 'test';
  colorScheme = 'cool';
  /*colorScheme: any = {
    domain: ['#956065', '#b8cbe7', '#89a1db', '#793d52', '#9780a1'],
  };*/

  subscription: Subscription = new Subscription();

  constructor(private olympicService: OlympicService, private router: Router) {}

  ngOnInit(): void {
    this.getOlympicsData();
    this.getTotalJo();
    this.getDataChart();
  }

  getOlympicsData(): void {
    this.subscription.add(
      this.olympicService
        .getOlympics()
        .subscribe((result) => (this.olympics$ = result))
    );
  }

  getTotalJo(): void {
    this.subscription.add(
      this.olympicService
        .getOlympics()
        .pipe(
          map((elements) =>
            elements.reduce((acc, val) => acc + val.participations.length, 0)
          )
        )
        .subscribe((result) => (this.totalJo = result))
    );
  }

  getDataChart(): void {
    this.subscription.add(
      this.olympicService.getOlympics().subscribe((elements) => {
        this.dataChart = elements.map((el) => {
          let totalMedals = 0;
          el.participations.forEach((element) => {
            totalMedals += element.medalsCount;
          });
          return {
            name: el.country,
            value: totalMedals,
          };
        });
      })
    );
  }

  goToDetail(event: { name: string; value: number; label: string }) {
    console.log(event);
    const selectCountry = this.olympics$.find(
      (olympic) => olympic.country === event.name
    );
    if (selectCountry) {
      this.router.navigate([`/detail/${selectCountry.id}`]);
    }
  }

  ngOnDestroy() {
    this.subscription.unsubscribe();
  }
}
