// GameBoard Module - variables and functions related to gameboard and its population

let gameBoardModule = ( function () {
  let gameBoardArray = ["",
                        "",
                        "",
                        "",
                        "",
                        "",
                        "",
                        "",
                        ""
  ];

  let winner;

  function renderGameBoard() {
    for (let i = 0; i < gameBoardArray.length; i++) {
      const gameBoardItem = document.querySelector(`#col-${i + 1}`);
      if (gameBoardArray[i] === "X") {
        gameBoardItem.style.color = "#00C"
      } else {
        gameBoardItem.style.color = "#C00"
      }

      gameBoardItem.innerHTML = `${gameBoardArray[i]}`;
    }
  }

  const gameBoardItems = document.querySelectorAll(".col");

  for(let i = 0; i < gameBoardItems.length; i++) {
    gameBoardItems[i].addEventListener("click", () => {
      if (player1.hasTurn) {
        if (!isTaken(gameBoardItems[i])) {
          gameBoardArray[i] = player1.marker;
        }
        player1.hasTurn = false;
        player2.hasTurn = true;
        renderGameBoard();
        gameModule.checkTie(gameBoardArray);
        winner = gameModule.getWinner(gameBoardArray, player1.marker);
        if (winner) {
          gameModule.displayWinner(winner);
        }
      } else {
        if (!isTaken(gameBoardItems[i])) {
          gameBoardArray[i] = player2.marker;
        }
        player2.hasTurn = false;
        player1.hasTurn = true;
        renderGameBoard();
        gameModule.checkTie(gameBoardArray);
        winner = gameModule.getWinner(gameBoardArray, player2.marker);
        if (winner) {
          gameModule.displayWinner(winner);
        }
      }
    });
  }

  function isTaken(element) {
    if (element.innerHTML === "X" || element.innerHTML === "O") {
      return true;
    } else {
      return false;
    }
  }

  return {
  gameBoardArray,
  isTaken
  }
})();

// Players Factory Function

const playerFactory = (name, marker, hasTurn) => {
  return { name, marker,  hasTurn };
};

const player1 = playerFactory("player 1", "X", true);
const player2 = playerFactory("player 2", "O", false);

// Main Game Module - Variables and functions related to game and its flow

let gameModule = ( function () {

  const winnerNameElement = document.querySelector("#winner");

  function isTaken(element) {
    if (element === "X" || element === "O") {
      return true;
    } else {
      return false;
    }
  }

  function checkTie(array) {
    let counter = 0;
    for (let i = 0; i < array.length; i++) {
      let taken = isTaken(array[i]);
      if (taken) {
        counter++;
      } else {
        break;
      }
    }

    if (counter === 9) {
      winnerNameElement.innerHTML = "It's a Tie";
    }
  }

  function getWinner([pos1, pos2, pos3, pos4, pos5, pos6, pos7, pos8, pos9], marker) {
    let winnerArray = [];

    // check 123, 147 and 159 combinations
    if (pos1 === marker) {
      winnerArray.push(1);
      if (pos2 === marker) {
        winnerArray.push(2);
        if (pos3 === marker) {
          winnerArray.push(3);
          return { winnerArray, marker };
        }
      } else if (pos4 === marker) {
        winnerArray.push(4);
        if (pos7 === marker) {
          winnerArray.push(7);
          return { winnerArray, marker };
        }
      } else if (pos5 === marker) {
        winnerArray.push(5);
        if (pos9 === marker) {
          winnerArray.push(9);
          return { winnerArray, marker };
        }
      }
    }

    // check 123 combination
    if (pos2 === marker) {
      winnerArray.push(2);
      if (pos5 === marker) {
        winnerArray.push(5);
        if (pos8 === marker) {
          winnerArray.push(8);
          return { winnerArray, marker };
        }
      }
    }

    // check 369 and 357 combinations
    if (pos3 === marker) {
      winnerArray.push(3);
      if (pos6 === marker) {
        winnerArray.push(6);
        if (pos9 === marker) {
          winnerArray.push(9);
          return { winnerArray, marker };
        }
      } else if (pos5 === marker) {
        winnerArray.push(5);
        if (pos7 === marker) {
          winnerArray.push(7);
          return { winnerArray, marker };
        }
      }
    }

    // check 456 combination
    if (pos4 === marker) {
      winnerArray.push(4);
      if (pos5 === marker) {
        winnerArray.push(5);
        if (pos6 === marker) {
          winnerArray.push(6);
          return { winnerArray, marker };
        }
      }
    }

    // check 789 combination
    if (pos7 === marker) {
      winnerArray.push(7);
      if (pos8 === marker) {
        winnerArray.push(8);
        if (pos9 === marker) {
          winnerArray.push(9);
          return { winnerArray, marker };
        }
      }
    }
  }

  function displayWinner(winner) {

    const gameBoardItems = document.querySelectorAll(".col");
    let array = winner.winnerArray;
    for (let i = 0; i < array.length; i++) {
      let index = array[i];
      blink(gameBoardItems[index - 1]);
    }
    
    if (winner.marker === "X") {
      winnerNameElement.innerHTML = "Player 1 Beat Player 2";
    } else {
      winnerNameElement.innerHTML = "Player 2 Beat Player 1";
    }
  }

  function blink(element) {
    text = element.textContent;
    setInterval(() => {
      if (element.textContent === text) {
        element.textContent = "";
      } else {
        element.textContent = text;
      }
    }, 300);
  }

  return {
    getWinner,
    displayWinner,
    checkTie
  }
})();