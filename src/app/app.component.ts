import { Component } from '@angular/core';
import { HeaderComponent } from './components/header/header.component';
import { RouterModule } from '@angular/router';
import { FooterToolbarComponent } from './components/footer-toolbar/footer-toolbar.component';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
  standalone: true,
  imports: [RouterModule, HeaderComponent, FooterToolbarComponent],
})
export class AppComponent {
  title = 'hacker-news-angular';
  // Todo: https://danielk.tech/home/angular-pwa
}
