import { Component } from '@angular/core';
import { Router, RouterModule } from '@angular/router';
import { AnonymousComponent } from '../anonymous/anonymous.component';
import { DatePickerComponent } from '../date-picker/date-picker.component';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatIconModule } from '@angular/material/icon';
import { BreakpointObserver, Breakpoints } from '@angular/cdk/layout';
import { Observable, map, of } from 'rxjs';
import { CommonModule } from '@angular/common';
import { MatRippleModule } from '@angular/material/core';

@Component({
  standalone: true,
  selector: 'app-footer-toolbar',
  templateUrl: './footer-toolbar.component.html',
  styleUrls: ['./footer-toolbar.component.scss'],
  imports: [CommonModule, RouterModule, AnonymousComponent, DatePickerComponent, MatToolbarModule, MatIconModule, MatRippleModule],
})
export class FooterToolbarComponent {
  constructor(public router: Router, private responsive: BreakpointObserver) {}
  date: string = new Date().toISOString().slice(0, 10);
  small$: Observable<boolean> = of(false);

  ngOnInit(): void {
    this.small$ = this.responsive.observe([Breakpoints.XSmall, Breakpoints.Small]).pipe(map((result) => result.matches));
  }

  onDateChanged(date: string): void {
    this.date = date;
    this.router.navigate(['news', date]);
  }
}
