import { ChangeDetectionStrategy, Component, inject } from '@angular/core';
import { Router, RouterModule } from '@angular/router';
import { DatePickerComponent } from '../date-picker/date-picker.component';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatIconModule } from '@angular/material/icon';
import { CommonModule } from '@angular/common';
import { MatRippleModule } from '@angular/material/core';
import { Store } from '@ngrx/store';
import { selectIsMobile$ } from 'src/app/+state/global.selector';

@Component({
  selector: 'app-footer-toolbar',
  templateUrl: './footer-toolbar.component.html',
  styleUrls: ['./footer-toolbar.component.scss'],
  imports: [CommonModule, RouterModule, DatePickerComponent, MatToolbarModule, MatIconModule, MatRippleModule],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class FooterToolbarComponent {
  private readonly router = inject(Router);
  private readonly store = inject(Store);
  date: string = new Date().toISOString().slice(0, 10);
  readonly small$ = this.store.select(selectIsMobile$);

  onDateChanged(date: string): void {
    this.date = date;
    this.router.navigate(['news', date]);
  }
}
