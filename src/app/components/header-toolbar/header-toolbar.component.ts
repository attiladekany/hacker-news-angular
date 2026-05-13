import { Component, Input, inject } from '@angular/core';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { GlobalActions } from 'src/app/+state/global.actions';
import { Store } from '@ngrx/store';
import { DataRefreshService } from 'src/app/services/data-refresh.service';

@Component({
    selector: 'app-header-toolbar',
    templateUrl: './header-toolbar.component.html',
    styleUrls: ['./header-toolbar.component.scss'],
    imports: [MatToolbarModule, MatButtonModule, MatIconModule]
})
export class HeaderToolbarComponent {
  private store = inject(Store);
  private refreshService = inject(DataRefreshService);

  @Input({ required: true }) title = '';
  @Input() isLoading = false;

  onHamburgerClicked(): void {
    this.store.dispatch(GlobalActions.toggleDrawer());
  }

  onTitleClicked(): void {
    if (!this.isLoading) {
      this.refreshService.triggerRefresh();
    }
  }
}
