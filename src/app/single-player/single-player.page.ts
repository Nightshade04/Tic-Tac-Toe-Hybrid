import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { AlertOptions } from '@ionic/core';
import { UtilitiesService } from '../services/utilities.service';

@Component({
  selector: 'app-single-player',
  templateUrl: './single-player.page.html',
  styleUrls: ['./single-player.page.scss'],
})
export class SinglePlayerPage implements OnInit {

  private board: any = [
    ['-', '-', '-'],
    ['-', '-', '-'],
    ['-', '-', '-']
  ];
  private stats: any = {
    player_wins: 0,
    bot_wins: 0,
    draws: 0
  };
  private turn: number = 1;
  public nextTurn: boolean = true;
  private overFlag: boolean = false;
  private ai_level: string = null;
  private scores: any = {
    X: 1,
    O: -1,
    tie: 0
  }

  constructor(
    private utilities: UtilitiesService,
    private activatedRoute: ActivatedRoute
  ) { }

  ngOnInit() {
    this.getMode();
    this.resetBoard()
  }

  getMode() {
    this.activatedRoute.queryParams.subscribe(params => {
      this.ai_level = params.mode;
      console.log(this.ai_level)
    })
  }

  equals3(a, b, c) {
    return a == b && b == c && a != '-';
  }

  min(a, b) {
    return (a < b) ? a : b;
  }

  max(a, b) {
    return (a < b) ? b : a;
  }

  randomizer() {
    return Math.floor(Math.random() * 3)
  }

  // Checking winner for minimax
  checkWinnerMiniMax(board) {
    let winner = null;

    // horizontal
    for (let i = 0; i < 3; i++) {
      if (this.equals3(board[i][0], board[i][1], board[i][2])) {
        winner = board[i][0];
      }
    }

    // Vertical
    for (let i = 0; i < 3; i++) {
      if (this.equals3(board[0][i], board[1][i], board[2][i])) {
        winner = board[0][i];
      }
    }

    // Diagonal
    if (this.equals3(board[0][0], board[1][1], board[2][2])) {
      winner = board[0][0];
    }
    if (this.equals3(board[2][0], board[1][1], board[0][2])) {
      winner = board[2][0];
    }

    let openSpots = 0;
    for (let i = 0; i < 3; i++) {
      for (let j = 0; j < 3; j++) {
        if (board[i][j] == '-') {
          openSpots++;
        }
      }
    }

    if (winner == null && openSpots == 0) {
      return 'tie';
    } else {
      return winner;
    }
  }

  // AI making its move
  ai_move() {
    let bestScore = 9999;
    let position = '';
    for (let i = 0; i < 3; i++) {
      for (let j = 0; j < 3; j++) {
        if (this.board[i][j] == '-') {
          this.board[i][j] = 'O';
          let currentScore = this.minimax(0, true, this.board);
          this.board[i][j] = '-';
          if (currentScore < bestScore) {
            bestScore = currentScore
            position = i + '' + j
          }
        }
      }
    }
    return position;
  }

  minimax(depth: number, maximizingPlayer: boolean, board: any): number {
    let returnValue = this.checkWinnerMiniMax(board)

    if (returnValue !== null) {
      return this.scores[returnValue]
    }

    else {
      if (!maximizingPlayer) {
        let bestScore = 9999;
        for (let i = 0; i < 3; i++) {
          for (let j = 0; j < 3; j++) {
            if (board[i][j] == '-') {
              board[i][j] = 'O';
              let currentScore = this.minimax(depth + 1, true, board);
              board[i][j] = '-';
              bestScore = this.min(currentScore, bestScore);
            }
          }
        }
        return bestScore;
      }
      else {
        let bestScore = -9999;
        for (let i = 0; i < 3; i++) {
          for (let j = 0; j < 3; j++) {
            if (board[i][j] == '-') {
              board[i][j] = 'X';
              let currentScore = this.minimax(depth + 1, false, board);
              board[i][j] = '-';
              bestScore = this.max(currentScore, bestScore);
            }
          }
        }
        return bestScore;
      }
    }
  }

  move(position: string, element: any) {
    if (this.overFlag) {
      this.utilities.presentToast('Game is already over. Please reset board to play again!');
    }
    else {
      if (element.textContent == '') {
        // Player Made a move
        element.textContent = 'X';
        this.board[position.charAt(0)][position.charAt(1)] = 'X';
        this.turn = this.turn + 1;
        this.nextTurn = false;

        setTimeout(() => {

          if (!this.overFlag) {
            let botPosition = '';
            if (this.ai_level == 'easy') {
              let row = this.randomizer();
              let col = this.randomizer();
              let placeFound = false;
              do {
                if (this.board[row][col] == '-') {
                  document.getElementById(row + '' + col).innerText = 'O';
                  this.board[row][col] = 'O';
                  placeFound = true;
                }
                else {
                  row = this.randomizer();
                  col = this.randomizer();
                }
              } while (!placeFound);
              botPosition = row + '' + col;
            }
            else if (this.ai_level == 'hard') {
              // Bot Made a move
              let aiPosition = this.ai_move();
              document.getElementById(aiPosition).innerText = 'O';
              this.board[aiPosition.charAt(0)][aiPosition.charAt(1)] = 'O';
              botPosition = aiPosition;
            }
            this.turn = this.turn + 1;
            this.nextTurn = true;

            // Checking if anyone won after the most recent move
            this.checkWinner(botPosition, 'O');
          }
        }, 500);

        // Checking if anyone won after the most recent move
        this.checkWinner(position, 'X');

        if (this.turn == 10) {
          this.nextTurn = null;
        }

      }
      // clicking an already clicked button i.e. trying to place marker on a non-empty place
      else {
        this.utilities.presentToast('Already filled. Choose another place.');
      }
    }
  }

  checkWinner(position: String, moveVar: string) {
    let row = parseInt(position.charAt(0));
    let col = parseInt(position.charAt(1));
    let placesToBeColored: string = '';

    // Checking Rows
    for (let i = 0; i < 3; i++) {
      if (this.board[i][col] !== moveVar) {
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
      if (this.board[row][i] !== moveVar) {
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
        if (this.board[i][i] !== moveVar) {
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
        if (this.board[i][2 - i] !== moveVar) {
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
    if (this.turn == 10 && !this.overFlag) {
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

    this.nextTurn = null;
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
      this.stats.player_wins = this.stats.player_wins + 1;
    }
    else if (moveVar == 'O') {
      alertOptions.message = "Congratulations! Second Player WON!";
      this.stats.bot_wins = this.stats.bot_wins + 1;
    }
    else {
      alertOptions.message = "Game ended in a draw!";
      this.stats.draws = this.stats.draws + 1;
    }
    this.utilities.presentWinnerPopup(alertOptions);
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
    this.nextTurn = true;
    this.overFlag = false;
  }

}
