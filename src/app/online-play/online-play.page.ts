import { Component, OnInit } from '@angular/core';
import { ProfileService } from '../services/profile.service';
import { UtilitiesService } from '../services/utilities.service';

@Component({
  selector: 'app-online-play',
  templateUrl: './online-play.page.html',
  styleUrls: ['./online-play.page.scss'],
})
export class OnlinePlayPage implements OnInit {

  private user: any = {};
  private matchHistory: any = [];
  private stats: any = {
    player_wins: 0,
    palyer_losses: 0,
    draws: 0
  }

  constructor(
    private profileService: ProfileService,
    private utilityService: UtilitiesService
  ) { }

  ngOnInit() {
    this.user = this.profileService.getUser();
    this.matchHistory = this.profileService.getMatchHistoryOfUser(this.user);
  }

  enterQueue() {

  }

}
