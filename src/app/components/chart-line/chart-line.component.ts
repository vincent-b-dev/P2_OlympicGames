import { Component, OnInit, Input, OnDestroy } from '@angular/core';
import { Router } from '@angular/router';
import { Subscription } from 'rxjs';
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

  subscription: Subscription[] = [];

  constructor(private olympicService: OlympicService, private router: Router) {}

  public ngOnInit(): void {
    this.subscription.push(
      this.olympicService.getOlymppicById(this.id).subscribe((result) => {
        if (result) this.InitData();
        else {
          this.router.navigate(['/']);
        }
      })
    );
  }

  public ngOnDestroy(): void {
    this.subscription.forEach((element) => element.unsubscribe());
  }

  /**
   * Initialise les données utiles au bon démarrage du composant
   */
  private InitData(): void {
    this.subscription.push(
      this.olympicService.getOlymppicById(this.id).subscribe((result) => {
        if (result) this.data = result;
      })
    );
    this.subscription.push(
      this.olympicService.getTotalMedals(this.id).subscribe((totalMedals) => {
        if (totalMedals) this.totalMedals = totalMedals;
      })
    );
    this.subscription.push(
      this.olympicService.getTotalAthletes(this.id).subscribe((totalAhlete) => {
        if (totalAhlete) this.totalAthletes = totalAhlete;
      })
    );
    this.subscription.push(
      this.olympicService.getDataLineChart(this.id).subscribe((data) => {
        this.dataChart = data;
      })
    );
  }
}
