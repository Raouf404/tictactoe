"use strict";

let gameboard = (function () {
  const main = document.querySelector("main");
  const newGameBtn = document.getElementById("new_game");
  let xTurn = true;

  let newGame = function () {
    main.innerHTML = "";

    for (let i = 0; i < 9; i++) {
      const div = document.createElement("div");
      div.classList.add("cell");
      div.classList.add("cell-x");

      let x, y;
      x = Math.floor(i / 3);
      y = i % 3;

      div.dataset.x = x;
      div.dataset.y = y;

      main.append(div);
    }

    tictactoe.newGame();
  };

  let handlePlay = function (e) {
    let turn = xTurn ? "x" : "o";
    let status = tictactoe.setCell(
      e.target.dataset.x,
      e.target.dataset.y,
      turn
    );

    if (status === 0) {
      const game = !tictactoe.checkWin();

      e.target.classList.remove("cell-o", "cell-x", "cell");
      e.target.classList.add(turn, "played");

      if (game) {
        toggleTurn();
      } else {
        console.log(tictactoe.getWinner() + " won!!!");
        Array.from(main.children).forEach((div) => {
          div.classList.add("played");
          div.classList.remove("cell-o", "cell-x", "cell");
        });
      }
    } else {
      console.error(status);
    }
  };

  let toggleTurn = function () {
    xTurn = !xTurn;
    Array.from(main.children).forEach((div) => {
      if (div.classList.contains("cell")) {
        if (xTurn) {
          div.classList.add("cell-x");
          div.classList.remove("cell-o");
        } else {
          div.classList.remove("cell-x");
          div.classList.add("cell-o");
        }
      }
    });
  };

  main.addEventListener("click", (e) => {
    if (e.target.classList.contains("cell")) {
      handlePlay(e);
    }
  });

  newGameBtn.addEventListener("click", newGame);

  newGame();
})();
