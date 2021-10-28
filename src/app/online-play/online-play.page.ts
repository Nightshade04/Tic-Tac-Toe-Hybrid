import { Component, OnInit } from '@angular/core';
import { ProfileService } from '../services/profile.service';

@Component({
  selector: 'app-online-play',
  templateUrl: './online-play.page.html',
  styleUrls: ['./online-play.page.scss'],
})
export class OnlinePlayPage implements OnInit {

  private matchHistory = [];
  private stats: any = {
    player_wins: 0,
    palyer_losses: 0,
    draws: 0
  }

  constructor(
    private profileService: ProfileService
  ) { }

  ngOnInit() {
  }

}
