import { Component, OnInit, Input } from '@angular/core';
import { Router } from '@angular/router';
import { OlympicService } from 'src/app/core/services/olympic.service';
import DataLineChart from 'src/app/core/models/data-line-chart';

@Component({
  selector: 'app-chart-line',
  templateUrl: './chart-line.component.html',
  styleUrls: ['./chart-line.component.scss'],
})
export class ChartLineComponent implements OnInit {
  @Input() id!: number;
  data: any;
  dataChart!: DataLineChart[];
  totalMedals!: number;
  totalAthletes!: number;
  totalParticipations!: number;

  // options
  showLabels: boolean = true;
  animations: boolean = true;
  xAxis: boolean = true;
  yAxis: boolean = true;

  colorScheme = '#5AA454';

  constructor(private olympicService: OlympicService, private router: Router) {}

  ngOnInit(): void {
    this.olympicService.getOlymppicById(this.id).subscribe((result) => {
      if (result) {
        this.data = result;
        this.totalMedals = result.participations.reduce(
          (total, medalsCount) => (total += medalsCount.medalsCount),
          0
        );
        this.totalAthletes = result.participations.reduce(
          (total, athletes) => (total += athletes.athleteCount),
          0
        );
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
      } else {
        this.router.navigate(['/']);
      }
    });
  }
}
