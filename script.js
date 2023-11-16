const message = document.getElementById("message");
let currentPlayer = "X";
let gameBoard = ["", "", "", "", "", "", "", "", ""];
let gameActive = true;

function handleCellClick(event) {
  const clickedCellIndex = event.target.dataset.cell;

  if (gameBoard[clickedCellIndex] === "" && gameActive) {
    gameBoard[clickedCellIndex] = currentPlayer;
    renderBoard();
    checkWinner();
    togglePlayer();
  }
}

function renderBoard() {
  board.innerHTML = "";
  gameBoard.forEach((value, index) => {
    const cell = document.createElement("div");
    cell.classList.add("cell");
    cell.textContent = value;
    cell.dataset.cell = index;
    cell.addEventListener("click", handleCellClick);

    if (value === "X") {
      cell.classList.add("x-player");
    } else if (value === "O") {
      cell.classList.add("o-player");
    }

    board.appendChild(cell);
  });
}

function togglePlayer() {
  currentPlayer = currentPlayer === "X" ? "O" : "X";
}

function checkWinner() {
  const winningCombinations = [
    [0, 1, 2],
    [3, 4, 5],
    [6, 7, 8], // Rows
    [0, 3, 6],
    [1, 4, 7],
    [2, 5, 8], // Columns
    [0, 4, 8],
    [2, 4, 6], // Diagonals
  ];

  for (const combination of winningCombinations) {
    const [a, b, c] = combination;
    if (
      gameBoard[a] &&
      gameBoard[a] === gameBoard[b] &&
      gameBoard[a] === gameBoard[c]
    ) {
      gameActive = false;
      message.textContent = `${currentPlayer} wins!`;
    }
  }

  if (!gameBoard.includes("") && gameActive) {
    gameActive = false;
    message.textContent = "It's a draw! The game is over.";
  }
}

function resetGame() {
  gameBoard = ["", "", "", "", "", "", "", "", ""];
  gameActive = true;
  currentPlayer = "X";
  message.textContent = "";
  renderBoard();
}

// Initialize the board on page load
renderBoard();

function toggleDarkMode() {
  document.body.classList.toggle("dark-mode");
}
