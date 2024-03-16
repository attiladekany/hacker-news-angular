import { Component, Input } from '@angular/core';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { GlobalActions } from 'src/app/+state/global.actions';
import { Store } from '@ngrx/store';

@Component({
  standalone: true,
  selector: 'app-header-toolbar',
  templateUrl: './header-toolbar.component.html',
  styleUrls: ['./header-toolbar.component.scss'],
  imports: [MatToolbarModule, MatButtonModule, MatIconModule],
})
export class HeaderToolbarComponent {
  constructor(private store: Store) {}

  @Input({ required: true }) title = '';

  onHamburgerClicked(): void {
    this.store.dispatch(GlobalActions.toggleDrawer());
  }
}
