import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { OnlineMatchPageRoutingModule } from './online-match-routing.module';

import { OnlineMatchPage } from './online-match.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    OnlineMatchPageRoutingModule
  ],
  declarations: [OnlineMatchPage]
})
export class OnlineMatchPageModule {}
