import { Component } from '@angular/core';
import { RouterModule } from '@angular/router';
import { AnonymousComponent } from '../anonymous/anonymous.component';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss'],
  imports: [RouterModule, AnonymousComponent],
  standalone: true,
})
export class HeaderComponent {}
