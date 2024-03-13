import { Component, EventEmitter, Input, OnInit, Output, ViewEncapsulation } from '@angular/core';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatInputModule } from '@angular/material/input';
import { MatFormFieldModule } from '@angular/material/form-field';
import { provideNativeDateAdapter } from '@angular/material/core';
import { FormControl, ReactiveFormsModule } from '@angular/forms';
import { MatMomentDateModule, provideMomentDateAdapter } from '@angular/material-moment-adapter';
import { Moment } from 'moment';

@Component({
  selector: 'app-date-picker',
  templateUrl: './date-picker.component.html',
  styleUrl: './date-picker.component.scss',
  standalone: true,
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
})
export class DatePickerComponent implements OnInit {
  @Input() date: string | Date = new Date();
  @Output() dateChanged = new EventEmitter<string>();
  startDate: Date = new Date();

  datePicker: FormControl<Date | null> = new FormControl(new Date());

  ngOnInit(): void {
    const date = typeof this.date === 'string' ? new Date(this.date) : new Date();
    this.startDate = new Date(date);
    this.datePicker = new FormControl(date);
    this.datePicker.disable();
  }

  onDateChange(value: Moment): void {
    const date = value.format('YYYY-MM-DD');

    this.dateChanged.emit(date);

    console.log('onDateChange', value);
    console.log('onDateChange', date);
  }
}
