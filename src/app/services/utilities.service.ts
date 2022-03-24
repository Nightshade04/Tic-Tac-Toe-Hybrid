import { Injectable } from '@angular/core';
import { AlertController, ToastController } from '@ionic/angular';
import { AlertOptions } from '@ionic/core';

@Injectable({
  providedIn: 'root'
})
export class UtilitiesService {

  constructor(
    private toastController: ToastController,
    private alertController: AlertController
  ) { }

  async presentToast(message: string) {
    const toast = await this.toastController.create({
      message: message,
      duration: 2000
    });
    toast.present();
  }

  async presentPopup(options: AlertOptions){
    let alert = this.alertController.create(options);
    (await alert).present();
  }

  async getMatchhistoryForUser() {

    
  }

}
