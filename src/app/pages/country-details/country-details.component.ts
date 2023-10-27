import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-country-details',
  templateUrl: './country-details.component.html',
  styleUrls: ['./country-details.component.scss'],
})
export class CountryDetailsComponent implements OnInit {
  paramId!: number;

  constructor(private route: ActivatedRoute) {}

  ngOnInit(): void {
    this.paramId = Number(this.route.snapshot.params['id']);
  }
}
