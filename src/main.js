import "../style/style.css";
import "../style/utilities.css";

// Selecting DOM elements for game control
const boxContainer = document.querySelector(".box-container");
const boxes = document.querySelectorAll(".box");
const newGame = document.querySelector(".new-game");
const winMessage = document.querySelector(".win-msg");
const rstGameBtn = document.querySelector(".rst-game-btn");
const newGameBtn = document.querySelector(".new-game-btn");

let player1 = true; //Indicates the current player (true for player 1, false for player 2)
let count = 0;

//Array representing winning patterns
let winPattern = [
  [0, 1, 2],
  [3, 4, 5],
  [6, 7, 8],
  [0, 3, 6],
  [1, 4, 7],
  [2, 5, 8],
  [0, 4, 8],
  [6, 4, 2],
];

boxes.forEach((box) => {
  box.addEventListener("click", () => {
    // Alternate between X and O
    if (player1) {
      box.innerHTML = "X";
      player1 = false;
    } else {
      box.innerHTML = "O";
      player1 = true;
    }

    box.disabled = true; // Disable the clicked box
    count++;

    //Check for a draw if all boxes are filled
    if (count === 9) {
      showDraw();
    }

    checkWinner();
  });
});

//check for a winner
const checkWinner = () => {
  for (const pattern of winPattern) {
    let position1Value = boxes[pattern[0]].innerHTML;
    let position2Value = boxes[pattern[1]].innerHTML;
    let position3Value = boxes[pattern[2]].innerHTML;

    if (
      position1Value !== "" &&
      position2Value !== "" &&
      position3Value !== ""
    ) {
      if (
        position1Value === position2Value &&
        position1Value === position3Value
      ) {
        showWinner(position1Value);
      }
    }
  }
};

// disable all boxes
const boxDisabled = () => {
  for (let box of boxes) {
    box.disabled = true;
  }
};

// display the winner message
const showWinner = (winner) => {
  boxContainer.style.display = "none";
  rstGameBtn.style.display = "none";
  newGame.style.display = "flex";
  winMessage.innerHTML = `Congratulations, the winner is ${winner}`;
  boxDisabled();
};

//display the draw message
const showDraw = () => {
  boxContainer.style.display = "none";
  rstGameBtn.style.display = "none";
  newGame.style.display = "flex";
  winMessage.innerHTML = "It's a draw!";
  boxDisabled();
};

//Reset Game
const resetGame = () => {
  for (let box of boxes) {
    box.innerHTML = "";
    box.disabled = false;
    count = 0;
  }
};

rstGameBtn.addEventListener("click", resetGame);

// New Game
newGameBtn.addEventListener("click", () => {
  newGame.style.display = "none";
  boxContainer.style.display = "flex";
  rstGameBtn.style.display = "inline-block";
  resetGame();
});
