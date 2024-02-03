import { Component } from '@angular/core';
import { HeaderComponent } from './comonents/header/header.component';
import { RouterModule } from '@angular/router';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
  standalone: true,
  imports: [RouterModule, HeaderComponent],
})
export class AppComponent {
  title = 'hacker-news-angular';
}
