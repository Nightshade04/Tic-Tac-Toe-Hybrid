import { Injectable } from '@angular/core';
import { Storage } from '@ionic/storage';

@Injectable({
  providedIn: 'root'
})
export class ProfileService {

  private userData: any = {};

  constructor(
    private storage: Storage
  ) {
    this.userData = storage.get('user');
  }


  // TODO: make it use secure storage,  currently using local storage for user data
  async getUser() {
    console.log(this.userData);
    if (this.userData == undefined) {
      const user = await this.storage.get('user');
      this.userData = user;
    }
    return this.userData;
  }

  async getMatchHistoryOfUser(user) {

  }

}
