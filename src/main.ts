import { bootstrapApplication } from '@angular/platform-browser';
import { AppComponent } from './app/app.component';
import { provideRouter } from '@angular/router';
import { isDevMode } from '@angular/core';
import { routes } from './app/app-routing.module';
import { HackerNewsService } from './typescript-angular-client-generated';
import { provideHttpClient } from '@angular/common/http';
import { provideStore } from '@ngrx/store';
import { GLOBAL_FEATURE_KEY } from './app/+state/global.selector';
import { globalReducer } from './app/+state/global.reducer';
import { provideStoreDevtools } from '@ngrx/store-devtools';
import { provideServiceWorker } from '@angular/service-worker';
import { metaReducers } from './app/+state/middleware/localstorage-sync.middleware';

bootstrapApplication(AppComponent, {
  providers: [
    provideRouter(routes),
    provideHttpClient(),
    HackerNewsService,
    // https://dev.to/ngrx/using-ngrx-packages-with-standalone-angular-features-53d8
    provideStore(
      { [GLOBAL_FEATURE_KEY]: globalReducer },
      {
        runtimeChecks: {
          strictActionImmutability: true,
          strictStateImmutability: true,
        },
        metaReducers: metaReducers,
      },
    ),
    provideStoreDevtools({
      maxAge: 25,
      logOnly: !isDevMode(),
    }),
    provideServiceWorker('ngsw-worker.js', {
      enabled: !isDevMode(),
      registrationStrategy: 'registerWhenStable:30000',
    }),
  ],
});
