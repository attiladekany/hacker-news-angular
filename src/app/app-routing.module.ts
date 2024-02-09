import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { BasePageComponent } from './pages/base-page/base-page.component';
import { getItemIdsPageData } from './resolvers/item-resolver';
import { AppComponent } from './app.component';
import { getAskIdsPageData } from './resolvers/ask-resolver';
import { getShowIdsPageData } from './resolvers/show-resolver';
import { getJobIdsPageData } from './resolvers/job-resolver';

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
        resolve: { ids: getItemIdsPageData },
      },
      {
        path: 'ask',
        title: 'Ask stories',
        component: BasePageComponent,
        resolve: { ids: getAskIdsPageData },
      },
      {
        path: 'show',
        title: 'Show stories',
        component: BasePageComponent,
        resolve: { ids: getShowIdsPageData },
      },
      {
        path: 'job',
        title: 'Job stories',
        component: BasePageComponent,
        resolve: { ids: getJobIdsPageData },
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
