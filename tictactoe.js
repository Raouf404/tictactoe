"use strict";

let tictactoe = (function () {
  let board, roundsPlayed, winner, game;

  const setCell = function (x, y, player) {
    if (!game) return -1;
    if (!(0 <= x <= 2 && 0 <= y <= 2)) return -2;
    if (player.toUpperCase() !== "X" && player.toUpperCase() !== "O") return -3;

    if (board[x][y] === "_") {
      board[x][y] = player.toUpperCase();
    } else {
      return -4;
    }

    roundsPlayed++;

    if (roundsPlayed >= 5 && checkWin()) {
      winner = player.toUpperCase();
      game = false;
    }

    if (roundsPlayed === 9) {
      game = false;
      if (!winner) winner = "tie";
    }

    return 0;
  };

  const checkWin = function () {
    if (!game) return true;
    if (roundsPlayed < 5) return false;

    for (let i = 0; i < 3; i++) {
      if (board[i][i] !== "_") {
        if (board[i][0] === board[i][1] && board[i][1] === board[i][2])
          return true;
        if (board[0][i] === board[1][i] && board[1][i] === board[2][i])
          return true;
      }
    }

    if (board[1][1] !== "_") {
      if (board[0][0] === board[1][1] && board[1][1] === board[2][2])
        return true;
      if (board[0][2] === board[1][1] && board[1][1] === board[2][0])
        return true;
    }

    return false;
  };

  const newGame = function () {
    board = [
      ["_", "_", "_"],
      ["_", "_", "_"],
      ["_", "_", "_"],
    ];
    roundsPlayed = 0;
    winner = null;
    game = true;
  };

  const displayBoard = function () {
    console.log(board[0][0] + " | " + board[0][1] + " | " + board[0][2]);
    console.log(board[1][0] + " | " + board[1][1] + " | " + board[1][2]);
    console.log(board[2][0] + " | " + board[2][1] + " | " + board[2][2]);
  };

  const getWinner = function () {
    return winner;
  };

  // Initialisation
  newGame();

  return { setCell, checkWin, getWinner, newGame, displayBoard };
})();
