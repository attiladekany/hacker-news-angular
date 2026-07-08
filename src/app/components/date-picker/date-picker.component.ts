import { ChangeDetectionStrategy, Component, EventEmitter, Output, ViewEncapsulation, effect, input } from '@angular/core';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatInputModule } from '@angular/material/input';
import { MatFormFieldModule } from '@angular/material/form-field';
import { provideNativeDateAdapter } from '@angular/material/core';
import { FormControl, ReactiveFormsModule } from '@angular/forms';
import { MatMomentDateModule, provideMomentDateAdapter } from '@angular/material-moment-adapter';
import { Moment } from 'moment';

@Component({
  standalone: true,
  selector: 'app-date-picker',
  templateUrl: './date-picker.component.html',
  styleUrls: ['./date-picker.component.scss'],
  providers: [
    provideNativeDateAdapter(),
    provideMomentDateAdapter({
      parse: {
        dateInput: ['l', 'LL'],
      },
      display: {
        dateInput: 'YYYY-MM-DD',
        monthYearLabel: 'MMM YYYY',
        dateA11yLabel: 'LL',
        monthYearA11yLabel: 'MMMM YYYY',
      },
    }),
  ],
  imports: [MatMomentDateModule, ReactiveFormsModule, MatFormFieldModule, MatInputModule, MatDatepickerModule],
  encapsulation: ViewEncapsulation.None,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class DatePickerComponent {
  private _date: string | Date = new Date();

  readonly date = input<string | Date>(new Date());

  constructor() {
    effect(() => {
      const value = this.date();
      this._date = value;
      this.datePicker.setValue(this._getDate(value));
    });
  }

  @Output() dateChanged = new EventEmitter<string>();
  readonly currentDate = new Date();

  get startDate(): Date {
    return this._getDate(this._date);
  }

  readonly datePicker = new FormControl<Date | null>(this._getDate(this._date));

  private _getDate(date: string | Date): Date {
    return typeof date === 'string' ? new Date(date) : new Date(date);
  }

  onDateChange(value: Moment): void {
    const date = value.format('YYYY-MM-DD');

    this.dateChanged.emit(date);

    console.log('onDateChange', value);
    console.log('onDateChange', date);
  }
}
