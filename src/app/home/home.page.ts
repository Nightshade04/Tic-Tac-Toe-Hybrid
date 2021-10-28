import { Component } from '@angular/core';
import { NavigationExtras } from '@angular/router';
import { NavController } from '@ionic/angular';
import { UtilitiesService } from '../services/utilities.service';

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})
export class HomePage {

  public modeSelected: boolean = false;

  constructor(
    private navCtrl: NavController,
    private utilities: UtilitiesService
  ) { }

  selectMode(element) {
    if (element.textContent == 'Single Player') {
      this.modeSelected = true;
    }
    else {
      this.navCtrl.navigateForward(['/multi-player']);
    }

  }

  singlePlayerNavigation(element) {

    let pressedButton = element.textContent;
    let navExtras: NavigationExtras = null;

    if (pressedButton == 'Easy') {
      navExtras = {
        queryParams: {
          mode: 'easy'
        }
      }
      this.navCtrl.navigateForward(['/single-player'], navExtras)
    }
    else if (pressedButton == 'Hard') {
      navExtras = {
        queryParams: {
          mode: 'hard'
        }
      }
      this.navCtrl.navigateForward(['/single-player'], navExtras)
    }
    else if (pressedButton == 'Online') {
      // this.utilities.presentToast('Online Mode Coming Soon!');
      this.navCtrl.navigateForward(['/online-play']);
    }
    else if (pressedButton == 'Back') {
      this.modeSelected = false;
    }

  }

}
