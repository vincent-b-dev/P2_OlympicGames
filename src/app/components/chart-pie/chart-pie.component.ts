import { Component } from '@angular/core';
import { Observable } from 'rxjs';
import { OlympicService } from 'src/app/core/services/olympic.service';
import Olympic from 'src/app/core/models/Olympic';
import DataChart from '../../core/models/dataPieChart';

@Component({
  selector: 'app-chart-pie',
  templateUrl: './chart-pie.component.html',
  styleUrls: ['./chart-pie.component.scss'],
})
export class ChartPieComponent {
  public olympics$: Observable<Olympic[]> = this.olympicService.getOlympics();
  totalJo: number;
  dataChart: DataChart[];
  colorScheme: string = 'cool'; /*any = {
    domain: ['red', 'green', '#C7B42C', '#AAAAAA'], //set the color pie
  };*/

  constructor(private olympicService: OlympicService) {}

  ngOnInit(): void {
    this.olympicService.getOlympics().subscribe((elements) => {
      if (elements && elements.length > 0) {
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
}
