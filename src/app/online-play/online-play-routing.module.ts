import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { OnlinePlayPage } from './online-play.page';

const routes: Routes = [
  {
    path: '',
    component: OnlinePlayPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class OnlinePlayPageRoutingModule {}
