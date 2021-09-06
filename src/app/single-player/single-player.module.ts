import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { SinglePlayerPageRoutingModule } from './single-player-routing.module';

import { SinglePlayerPage } from './single-player.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    SinglePlayerPageRoutingModule
  ],
  declarations: [SinglePlayerPage]
})
export class SinglePlayerPageModule {}
