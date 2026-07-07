import { ChangeDetectionStrategy, Component, EventEmitter, Input, Output, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CardComponent } from 'src/app/components/card/card.component';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { LayoutModule } from '@angular/cdk/layout';
import { ScrollNearEndDirective } from 'src/app/directives/scroll-near-end.directive';
import { Item } from 'src/typescript-angular-client-generated';
import { Store } from '@ngrx/store';
import { selectFavoriteItemIds$, selectIsDrawerOpened$, selectIsMobile$, selectLayoutType$ } from 'src/app/+state/global.selector';
import { HeaderToolbarComponent } from '../../../components/header-toolbar/header-toolbar.component';
import { MatSidenavModule } from '@angular/material/sidenav';
import { MatButtonModule } from '@angular/material/button';
import { MatButtonToggleChange, MatButtonToggleModule } from '@angular/material/button-toggle';
import { GlobalActions } from 'src/app/+state/global.actions';
import { LayoutType } from 'src/app/+state/models/global.state';
import { MatGridListModule } from '@angular/material/grid-list';
import { TileElementComponent } from 'src/app/components/tile-element/tile-element.component';
import { faUpRightAndDownLeftFromCenter } from '@fortawesome/free-solid-svg-icons';

@Component({
  selector: 'app-layout',
  imports: [
    CommonModule,
    HeaderToolbarComponent,
    CardComponent,
    MatProgressSpinnerModule,
    LayoutModule,
    ScrollNearEndDirective,
    MatSidenavModule,
    MatButtonModule,
    MatButtonToggleModule,
    MatGridListModule,
    TileElementComponent,
  ],
  templateUrl: './layout.component.html',
  styleUrls: ['./layout.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class LayoutComponent {
  @Input({ required: true }) title = '';
  @Input({ required: true }) entities: Item[] = [];
  @Input({ required: true }) isLoading = true;
  @Output() readonly nearEnd = new EventEmitter<void>();

  private readonly _store = inject(Store);
  readonly small$ = this._store.select(selectIsMobile$);
  readonly isDrawerOpened$ = this._store.select(selectIsDrawerOpened$);
  readonly layoutType$ = this._store.select(selectLayoutType$);
  readonly favoriteItemIds$ = this._store.select(selectFavoriteItemIds$);

  readonly LayoutType = LayoutType;
  readonly faUpRightFromSquare = faUpRightAndDownLeftFromCenter;
  readonly currentYear = new Date().getFullYear();

  onLayoutTypeChanged(event: MatButtonToggleChange): void {
    this._store.dispatch(GlobalActions.setLayoutType({ layoutType: event.value }));
  }
}
