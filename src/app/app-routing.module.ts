import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './pages/home/home.component';
import { getItemIdsPageData } from './resolvers/item-resolver';

const routes: Routes = [
  {
    path: '',
    resolve: { ids: getItemIdsPageData },
    component: HomeComponent,
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
