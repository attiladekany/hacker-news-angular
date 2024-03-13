import { bootstrapApplication } from '@angular/platform-browser';
import { AppComponent } from './app/app.component';
import { RouterModule } from '@angular/router';
import { importProvidersFrom, isDevMode } from '@angular/core';
import { routes } from './app/app-routing.module';
import { HackerNewsService } from './typescript-angular-client-generated';
import { provideHttpClient } from '@angular/common/http';
import { provideAnimations } from '@angular/platform-browser/animations';
import { provideStore } from '@ngrx/store';
import { GLOBAL_FEATURE_KEY } from './app/+state/global.selector';
import { globalReducer } from './app/+state/global.reducer';
import { provideStoreDevtools } from '@ngrx/store-devtools';

bootstrapApplication(AppComponent, {
  providers: [
    importProvidersFrom(RouterModule.forRoot(routes)),
    provideHttpClient(),
    HackerNewsService,
    provideAnimations(),
    // https://dev.to/ngrx/using-ngrx-packages-with-standalone-angular-features-53d8
    provideStore(
      { [GLOBAL_FEATURE_KEY]: globalReducer },
      {
        runtimeChecks: {
          strictActionImmutability: true,
          strictStateImmutability: true,
        },
      }
    ),
    provideStoreDevtools({
      maxAge: 25,
      logOnly: isDevMode(),
    }),
  ],
});
