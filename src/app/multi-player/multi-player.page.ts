import { Component, OnInit } from '@angular/core';
import { AlertOptions } from '@ionic/core';
import { UtilitiesService } from '../services/utilities.service';

@Component({
  selector: 'app-multi-player',
  templateUrl: './multi-player.page.html',
  styleUrls: ['./multi-player.page.scss'],
})
export class MultiPlayerPage implements OnInit {

  private board: any = [
    ['-', '-', '-'],
    ['-', '-', '-'],
    ['-', '-', '-']
  ];
  private stats: any = {
    x_wins: 0,
    o_wins: 0,
    draws: 0
  };
  private turn: number = 1;
  public nextTurn: String = '-';
  private overFlag: boolean = false;

  constructor(
    private utilities: UtilitiesService
  ) { }

  ngOnInit() {
    this.resetBoard()
  }

  move(position: String, element: any) {
    if (this.overFlag) {
      this.utilities.presentToast('Game is already over. Please reset board to play again!');
    }
    else {
      if (element.textContent == '') {

        // Made a move
        if (this.turn % 2 == 0) {
          element.textContent = 'O';

          this.board[position.charAt(0)][position.charAt(1)] = 'O';

          this.nextTurn = 'X';
        }
        else {
          element.textContent = 'X';

          this.board[position.charAt(0)][position.charAt(1)] = 'X';

          this.nextTurn = 'O';
        }
        // Checking if anyone won after the most recent move
        if (this.turn % 2 == 0) {
          this.checkWinner(position, 'O');
        }
        else {
          this.checkWinner(position, 'X');
        }

        // Advanced turn
        this.turn = this.turn + 1;


        if (this.turn == 10) {
          this.nextTurn = '-';
        }

      }
      // clicking an already clicked button i.e. trying to place marker on a non-empty place
      else {
        this.utilities.presentToast('Already filled. Choose another place.');
      }
    }
  }

  checkWinner(position: String, moveVar: String) {
    let row = parseInt(position.charAt(0));
    let col = parseInt(position.charAt(1));
    let placesToBeColored: string = '';

    // Checking Rows
    for (let i = 0; i < 3; i++) {
      if (this.board[i][col] != moveVar) {
        placesToBeColored = '';
        break;
      }
      placesToBeColored += i + '' + col + ' ';
      if (i == 2) {
        this.gameOver(moveVar, placesToBeColored);
        this.overFlag = true;

      }
    }

    // Checking cols
    for (let i = 0; i < 3; i++) {
      if (this.board[row][i] != moveVar) {
        placesToBeColored = '';
        break;
      }
      placesToBeColored += row + '' + i + ' ';
      if (i == 2) {
        this.gameOver(moveVar, placesToBeColored);
        this.overFlag = true;
      }
    }

    // Checking diagonal
    if (row == col) {
      for (let i = 0; i < 3; i++) {
        if (this.board[i][i] != moveVar) {
          placesToBeColored = '';
          break;
        }
        placesToBeColored += i + '' + i + ' ';
        if (i == 2) {
          this.gameOver(moveVar, placesToBeColored);
          this.overFlag = true;
        }
      }
    }

    // Checking anti-diagonal
    if ((row + col) == 2) {
      for (let i = 0; i < 3; i++) {
        if (this.board[i][2 - i] != moveVar) {
          placesToBeColored = '';
          break;
        }
        placesToBeColored += i + '' + (2 - i) + ' ';
        if (i == 2) {
          this.gameOver(moveVar, placesToBeColored);
          this.overFlag = true;
        }
      }
    }

    // Checking Draw
    if (this.turn == 9 && !this.overFlag) {
      this.overFlag = true;
      this.gameOver('draw', "");
    }
  }

  gameOver(moveVar: String, placesToBeColored: string) {

    if (placesToBeColored != '') {
      placesToBeColored = placesToBeColored.trim();
      let buttonIds = placesToBeColored.split(" ");
      for (let id in buttonIds) {
        document.getElementById(buttonIds[id]).style.backgroundColor = '#88f35e';
      }
    }

    this.nextTurn = '-';
    let alertOptions: AlertOptions = {
      header: "Game Over",
      message: "",
      buttons: [
        {
          text: "Ok"
        },
        {
          text: "Reset Board",
          handler: () => {
            this.resetBoard();
          }
        }
      ]
    }
    if (moveVar == 'X') {
      alertOptions.message = "Congratulations! First Player WON!";
      this.stats.x_wins = this.stats.x_wins + 1;
    }
    else if (moveVar == 'O') {
      alertOptions.message = "Congratulations! Second Player WON!";
      this.stats.o_wins = this.stats.o_wins + 1;
    }
    else {
      alertOptions.message = "Game ended in a draw!";
      this.stats.draws = this.stats.draws + 1;
    }
    this.utilities.presentPopup(alertOptions);
  }

  resetBoard() {
    this.board = [
      ['-', '-', '-'],
      ['-', '-', '-'],
      ['-', '-', '-']
    ];

    // making the UI board empty too
    for (let i = 0; i < 3; i++) {
      for (let j = 0; j < 3; j++) {
        let buttonId = i + '' + j;
        document.getElementById(buttonId).innerText = "";
        document.getElementById(buttonId).style.backgroundColor = '';
      }
    }

    if (this.overFlag || this.turn > 1) {
      this.utilities.presentToast('Board has been reset.');
    }

    this.turn = 1;
    this.nextTurn = 'X';
    this.overFlag = false;
  }

}

