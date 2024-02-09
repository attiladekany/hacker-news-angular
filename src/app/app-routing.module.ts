import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { BasePageComponent } from './pages/base-page/base-page.component';
import { AppComponent } from './app.component';
import { AskStoriesService } from './services/ask-stories.service';
import { URLPaths } from './others/constants';
import { ShowStoriesService } from './services/show-stories.service';
import { JobStoriesService } from './services/job-stories.service';
import { resolveTopItemIds$ } from './resolvers/top-id.resolver';
import { getIds$ } from './resolvers/id.resolver';

export const routes: Routes = [
  { path: '', redirectTo: 'news/top', pathMatch: 'full' },
  {
    path: 'news',
    component: AppComponent,
    children: [
      {
        path: 'top',
        title: 'Top hacker news',
        component: BasePageComponent,
        resolve: { ids: resolveTopItemIds$ },
      },
      {
        path: 'ask',
        title: 'Ask stories',
        component: BasePageComponent,
        resolve: { ids: getIds$ },
        data: { service: AskStoriesService, uri: URLPaths.ASK_STORIES },
      },
      {
        path: 'show',
        title: 'Show stories',
        component: BasePageComponent,
        resolve: { ids: getIds$ },
        data: { service: ShowStoriesService, uri: URLPaths.SHOW_STORIES },
      },
      {
        path: 'job',
        title: 'Job stories',
        component: BasePageComponent,
        resolve: { ids: getIds$ },
        data: { service: JobStoriesService, uri: URLPaths.JOB_STORIES },
      },
      { path: '**', redirectTo: 'top', pathMatch: 'full' },
    ],
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
