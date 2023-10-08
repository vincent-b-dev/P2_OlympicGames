import { Component, OnInit } from '@angular/core';
import { Observable, of } from 'rxjs';
import { OlympicService } from 'src/app/core/services/olympic.service';
import Olympic from 'src/app/core/models/Olympic';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss'],
})
export class HomeComponent implements OnInit {
  public olympics$: Observable<Olympic[]>;
  totalJo: any;
  data: any[];
  view: number;
  colorScheme: any = 'cool';

  constructor(private olympicService: OlympicService) {}

  ngOnInit(): void {
    this.view = 50;
    this.olympics$ = this.olympicService.getOlympics();
    this.olympicService.getOlympics().subscribe((elements: any[]) => {
      if (elements && elements.length > 0) {
        console.log(elements);
        this.totalJo = elements.reduce((total: number, data: any) => {
          return (total += data.participations.length);
        }, 0);

        // Utilisez la méthode `map` pour transformer chaque élément du tableau
        this.data = elements.map((data: any) => {
          let totalMedals = 0;
          // Calculer le total des médailles pour chaque participation
          data.participations.forEach((participation: any) => {
            totalMedals += participation.medalsCount;
          });
          // Retourner un objet avec le nom du pays et le total des médailles
          return {
            name: data.country,
            value: totalMedals,
          };
        });
      }
    });
  }
}
