import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { TopComponent } from './pages/top/top.component';
import { getItemIdsPageData } from './resolvers/item-resolver';
import { AskComponent } from './pages/ask/ask.component';
import { ShowComponent } from './pages/show/show.component';
import { AppComponent } from './app.component';
import { JobComponent } from './pages/job/job.component';

export const routes: Routes = [
  { path: '', redirectTo: 'news/top', pathMatch: 'full' },
  {
    path: 'news',
    component: AppComponent,
    children: [
      {
        path: 'top',
        resolve: { ids: getItemIdsPageData },
        component: TopComponent,
      },
      {
        path: 'ask',
        component: AskComponent,
      },
      {
        path: 'show',
        component: ShowComponent,
      },
      {
        path: 'job',
        component: JobComponent,
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
