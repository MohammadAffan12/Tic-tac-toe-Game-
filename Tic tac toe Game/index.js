const boxes = document.querySelectorAll(".box");
const resetButton = document.querySelector("#reset-btn");
const newGameBtn = document.querySelector('#newgame-btn');
const turnMsg = document.querySelector("#turn-msg");

const gameState = {
    board: ["", "", "", "", "", "", "", "", ""],
    currentPlayer: "X",
    isGameOver: false,
    winner: null, // Added to track the winner
    winningPattern: null, // Added to track the winning pattern
};

const render = () => {
    boxes.forEach((box, index) => {
        box.innerHTML = gameState.board[index];
        box.disabled = gameState.board[index] !== "";
        box.style.backgroundColor = ""; // Reset background color
    });

    if (gameState.isGameOver) {
        if (gameState.winner) {
            turnMsg.innerText = `Player ${gameState.winner} wins!`;
            highlightWinningBoxes(gameState.winningPattern); // Highlight winning boxes
        } else {
            turnMsg.innerText = "It's a draw";
        }
    } else {
        turnMsg.innerText = `Turn for Player ${gameState.currentPlayer}`;
    }
};

// Check for a winner
const checkWinner = (player) => {
    for (let pattern of winPatterns) {
        const [a, b, c] = pattern;
        if (gameState.board[a] === player && gameState.board[b] === player && gameState.board[c] === player) {
            gameState.isGameOver = true; // Set game over to true
            gameState.winner = player; // Set the winner
            gameState.winningPattern = pattern; // Save the winning pattern
            return true; // Return true for winning
        }
    }
    if (gameState.board.every(box => box !== "")) {
        gameState.isGameOver = true; // Set game over to true
        gameState.winner = null; // No winner for draw
        return true; // Indicate a draw
    }
    return false; // No winner
};

// Highlight the winning boxes within the render function
const highlightWinningBoxes = (winningPattern) => {
    if (winningPattern) {
        winningPattern.forEach(index => {
           boxes[index].style.backgroundColor = "lightgreen";
        });
    }
};

// Reset the game state
const resetGame = () => {
    gameState.board = Array(9).fill("");
    gameState.currentPlayer = "X";
    gameState.isGameOver = false; // Reset game over state
    gameState.winner = null; // Reset winner state
    gameState.winningPattern = null; // Reset winning pattern
    render(); // Rerender to reset UI
};

// Event listener for each box
boxes.forEach((box, index) => {
    box.addEventListener("click", () => {
        if (gameState.board[index] === "" && !gameState.isGameOver) {
            gameState.board[index] = gameState.currentPlayer;
            const hasWinner = checkWinner(gameState.currentPlayer);
            render(); // Rerender the game state
            if (!hasWinner) {
                gameState.currentPlayer = gameState.currentPlayer === "X" ? "O" : "X"; // Change turn
            }
        }
    });
});

// Event listeners for buttons
newGameBtn.addEventListener("click", resetGame);
resetButton.addEventListener("click", resetGame);

// Winning patterns
const winPatterns = [
    [0, 1, 2],
    [0, 3, 6],
    [0, 4, 8],
    [1, 4, 7],
    [2, 5, 8],
    [2, 4, 6],
    [3, 4, 5],
    [6, 7, 8]
];

// Initial render
//render();
