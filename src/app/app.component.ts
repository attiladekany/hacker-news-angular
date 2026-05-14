import { ChangeDetectionStrategy, Component, DestroyRef, OnInit, inject } from '@angular/core';
import { RouterModule } from '@angular/router';
import { FooterToolbarComponent } from './components/footer-toolbar/footer-toolbar.component';
import { map, switchMap, take } from 'rxjs';
import { BreakpointObserver, Breakpoints } from '@angular/cdk/layout';
import { CommonModule } from '@angular/common';
import { Store } from '@ngrx/store';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { GlobalActions } from './+state/global.actions';
import { selectIsMobile$ } from './+state/global.selector';
import { SwUpdate } from '@angular/service-worker';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
  imports: [CommonModule, RouterModule, FooterToolbarComponent],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class AppComponent implements OnInit {
  private readonly _destroyRef = inject(DestroyRef);
  private readonly responsive = inject(BreakpointObserver);
  private readonly swUpdate = inject(SwUpdate);
  private readonly store = inject(Store);

  ngOnInit(): void {
    this._setIsMobileListener();
    this._subscribeToVersionUpdates();
  }

  private _setIsMobileListener(): void {
    this.responsive
      .observe([Breakpoints.XSmall, Breakpoints.Small])
      .pipe(
        takeUntilDestroyed(this._destroyRef),
        map((result) => result.matches),
        switchMap((isMobile) =>
          this.store.select(selectIsMobile$).pipe(
            take(1),
            map((stored) => ({ isMobile, stored })),
          ),
        ),
      )
      .subscribe(({ isMobile, stored }) => {
        if (isMobile === stored) return;
        this._setIsMobile(isMobile);
      });
  }

  private _subscribeToVersionUpdates(): void {
    if (!this.swUpdate.isEnabled) return;

    this.swUpdate.versionUpdates.pipe(takeUntilDestroyed(this._destroyRef)).subscribe((event) => {
      if (event.type !== 'VERSION_READY') return;

      if (confirm("You're using an old version of the control panel. Want to update?")) {
        window.location.reload();
      }
    });
  }

  private _setIsMobile(isMobile: boolean): void {
    this.store.dispatch(GlobalActions.setIsMobileView({ isMobile }));
  }
}
