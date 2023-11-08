import { Component, Input } from '@angular/core';
import header from '../../core/models/header.model';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss'],
})
export class HeaderComponent {
  @Input() header!: header;
}
