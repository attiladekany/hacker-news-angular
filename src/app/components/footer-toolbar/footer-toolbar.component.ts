import { Component } from '@angular/core';
import { Router, RouterModule } from '@angular/router';
import { AnonymousComponent } from '../anonymous/anonymous.component';
import { DatePickerComponent } from '../date-picker/date-picker.component';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatIconModule } from '@angular/material/icon';
import { CommonModule } from '@angular/common';
import { MatRippleModule } from '@angular/material/core';
import { Store } from '@ngrx/store';
import { selectIsMobile$ } from 'src/app/+state/global.selector';

@Component({
  standalone: true,
  selector: 'app-footer-toolbar',
  templateUrl: './footer-toolbar.component.html',
  styleUrls: ['./footer-toolbar.component.scss'],
  imports: [CommonModule, RouterModule, AnonymousComponent, DatePickerComponent, MatToolbarModule, MatIconModule, MatRippleModule],
})
export class FooterToolbarComponent {
  constructor(public router: Router, private store: Store) {}
  date: string = new Date().toISOString().slice(0, 10);
  small$ = this.store.select(selectIsMobile$);

  onDateChanged(date: string): void {
    this.date = date;
    this.router.navigate(['news', date]);
  }
}
