import { NgModule } from '@angular/core';
import { PreloadAllModules, RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  {
    path: 'home',
    loadChildren: () => import('./home/home.module').then( m => m.HomePageModule)
  },
  {
    path: '',
    redirectTo: 'home',
    pathMatch: 'full'
  },
  {
    path: 'profile',
    loadChildren: () => import('./profile/profile.module').then( m => m.ProfilePageModule)
  },
  {
    path: 'online-play',
    loadChildren: () => import('./online-play/online-play.module').then( m => m.OnlinePlayPageModule)
  },
  {
    path: 'single-player',
    loadChildren: () => import('./single-player/single-player.module').then( m => m.SinglePlayerPageModule)
  },
  {
    path: 'multi-player',
    loadChildren: () => import('./multi-player/multi-player.module').then( m => m.MultiPlayerPageModule)
  },
  {
    path: 'online-match',
    loadChildren: () => import('./online-match/online-match.module').then( m => m.OnlineMatchPageModule)
  },
];

@NgModule({
  imports: [
    RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules })
  ],
  exports: [RouterModule]
})
export class AppRoutingModule { }
