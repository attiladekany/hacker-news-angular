import { Component, EventEmitter, Input, Output } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CardComponent } from 'src/app/components/card/card.component';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { LayoutModule } from '@angular/cdk/layout';
import { ScrollNearEndDirective } from 'src/app/directives/scroll-near-end.directive';
import { Item } from 'src/typescript-angular-client-generated';
import { Store } from '@ngrx/store';
import { selectIsDrawerOpened$, selectIsMobile$ } from 'src/app/+state/global.selector';
import { HeaderComponent } from 'src/app/components/header/header.component';
import { HeaderToolbarComponent } from '../../../components/header-toolbar/header-toolbar.component';
import { MatSidenavModule } from '@angular/material/sidenav';
import { MatButtonModule } from '@angular/material/button';

@Component({
  selector: 'app-layout',
  standalone: true,
  imports: [
    CommonModule,
    HeaderComponent,
    HeaderToolbarComponent,
    CardComponent,
    MatProgressSpinnerModule,
    LayoutModule,
    ScrollNearEndDirective,
    MatSidenavModule,
    MatButtonModule,
  ],
  templateUrl: './layout.component.html',
  styleUrl: './layout.component.scss',
})
export class LayoutComponent {
  @Input({ required: true }) title = '';
  @Input({ required: true }) entities: Item[] = [];
  @Input({ required: true }) isLoading = true;
  @Output() nearEnd: EventEmitter<void> = new EventEmitter<void>();

  small$ = this.store.select(selectIsMobile$);
  isDrawerOpened$ = this.store.select(selectIsDrawerOpened$);

  constructor(private store: Store) {}
}
