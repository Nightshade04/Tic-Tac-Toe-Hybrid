import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { OnlinePlayPageRoutingModule } from './online-play-routing.module';

import { OnlinePlayPage } from './online-play.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    OnlinePlayPageRoutingModule
  ],
  declarations: [OnlinePlayPage]
})
export class OnlinePlayPageModule {}
