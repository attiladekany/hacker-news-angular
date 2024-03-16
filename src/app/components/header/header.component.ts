import { Component, Input } from '@angular/core';
import { RouterModule } from '@angular/router';
import { AnonymousComponent } from '../anonymous/anonymous.component';

@Component({
  standalone: true,
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss'],
  imports: [RouterModule, AnonymousComponent],
})
// Deprecated
export class HeaderComponent {
  @Input({ required: true }) title = '';
}
