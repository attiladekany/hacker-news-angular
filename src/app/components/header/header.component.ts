import { Component } from '@angular/core';
import { Router, RouterModule } from '@angular/router';
import { AnonymousComponent } from '../anonymous/anonymous.component';
import { DatePickerComponent } from '../date-picker/date-picker.component';

@Component({
  standalone: true,
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss'],
  imports: [RouterModule, AnonymousComponent, DatePickerComponent],
})
export class HeaderComponent {
  constructor(public router: Router) {}
  date: string = new Date().toISOString().slice(0, 10);

  onDateChanged(date: string): void {
    this.date = date;
    this.router.navigate(['news', date]);
  }
}
