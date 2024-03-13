import { Component, DestroyRef, OnInit, inject } from '@angular/core';
import { HeaderComponent } from './components/header/header.component';
import { RouterModule } from '@angular/router';
import { FooterToolbarComponent } from './components/footer-toolbar/footer-toolbar.component';
import { firstValueFrom, map } from 'rxjs';
import { BreakpointObserver, Breakpoints } from '@angular/cdk/layout';
import { CommonModule } from '@angular/common';
import { Store } from '@ngrx/store';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { GlobalActions } from './+state/global.actions';
import { selectIsMobile$ } from './+state/global.selector';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
  standalone: true,
  imports: [CommonModule, RouterModule, HeaderComponent, FooterToolbarComponent],
})
export class AppComponent implements OnInit {
  private _destroyRef = inject(DestroyRef);

  constructor(private responsive: BreakpointObserver, private store: Store) {}

  small$ = this.store.select(selectIsMobile$);

  onSetIsMobile(isMobile: boolean) {
    this.store.dispatch(GlobalActions.setIsMobileView({ isMobile }));
  }

  async ngOnInit(): Promise<void> {
    this.responsive
      .observe([Breakpoints.XSmall, Breakpoints.Small])
      .pipe(
        takeUntilDestroyed(this._destroyRef),
        map((result) => result.matches)
      )
      .subscribe(async (isMobile) => {
        const stored = await firstValueFrom(this.store.select(selectIsMobile$));

        if (isMobile === stored) return;
        this.onSetIsMobile(isMobile);
      });
  }

  title = 'hacker-news-angular';
  // Todo: https://danielk.tech/home/angular-pwa
}
