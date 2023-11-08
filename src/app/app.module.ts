import { HttpClientModule } from '@angular/common/http';
import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HomeComponent } from './pages/home/home.component';
import { NotFoundComponent } from './pages/not-found/not-found.component';
import { NgxChartsModule } from '@swimlane/ngx-charts';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

import { CountryDetailsComponent } from './pages/country-details/country-details.component';
import { ChartPieComponent } from './components/chart-pie/chart-pie.component';
import { ChartLineComponent } from './components/chart-line/chart-line.component';
import { MedalsComponent } from './components/medal-svg/medals.component';
import { ArrowSvgComponent } from './components/arrow-svg/arrow-svg.component';
import { HeaderComponent } from './components/header/header.component';

@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    NotFoundComponent,
    CountryDetailsComponent,
    ChartPieComponent,
    ChartLineComponent,
    MedalsComponent,
    ArrowSvgComponent,
    HeaderComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    NgxChartsModule,
    BrowserAnimationsModule,
  ],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule {}
