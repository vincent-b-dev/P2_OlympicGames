import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { OlympicService } from 'src/app/core/services/olympic.service';
import Olympic from 'src/app/core/models/Olympic';
import DataChart from '../../core/models/dataPieChart';

@Component({
  selector: 'app-chart-pie',
  templateUrl: './chart-pie.component.html',
  styleUrls: ['./chart-pie.component.scss'],
})
export class ChartPieComponent {
  public olympics$: Olympic[];
  totalJo: number;
  dataChart: DataChart[];
  colorScheme: any = {
    domain: ['#956065', '#b8cbe7', '#89a1db', '#793d52', '#9780a1'],
  };
  //italy france gezrmany unitedspain ,
  constructor(private olympicService: OlympicService, private router: Router) {}

  ngOnInit(): void {
    this.olympicService.getOlympics().subscribe((elements) => {
      if (elements && elements.length > 0) {
        this.olympics$ = elements;
        // total participation
        this.totalJo = elements.reduce((total: number, participation: any) => {
          return (total += participation.participations.length);
        }, 0);

        this.dataChart = elements.map((el) => {
          let totalMedals = 0;
          // total medals for each participation
          el.participations.forEach((element) => {
            totalMedals += element.medalsCount;
          });
          return {
            name: el.country,
            value: totalMedals,
          };
        });
      }
    });
  }

  goToDetail(event: any) {
    const selectCountry = this.olympics$.find(
      (olympic) => olympic.country === event.name
    );
    if (selectCountry) {
      this.router.navigate([`/detail/${selectCountry.id}`]);
    }
  }
}
