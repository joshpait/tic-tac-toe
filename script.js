const TicTacToe = (function() {
    let player1 = null;
    let player2 = null;
    let currentPlayer = null;

    const createBoard = () => {
        let board = [];

        for (let i = 0; i < 3; i++) {
            board[i] = [];
            for (let j = 0; j < 3; j++) {
                board[i][j] = '';
            }
        }
        return board;
    };

    const printBoard = (board) => {
        const gameboard = document.getElementById('gameboard');
        gameboard.innerHTML = ''; // Clear previous content

        board.forEach((row, rowIndex) => {
            row.forEach((cell, colIndex) => {
                const cellDiv = document.createElement('div');
                cellDiv.classList.add('cell');
                cellDiv.dataset.row = rowIndex;
                cellDiv.dataset.col = colIndex;
                cellDiv.textContent = cell;
                cellDiv.addEventListener('click', () => game.makeMove(rowIndex, colIndex)); // Access makeMove through game object
                gameboard.appendChild(cellDiv);
            });
        });
    };

    const createPlayer = (name, symbol) => {
        return { name, symbol };
    };

    const createPlayersFromInput = () => {
        const player1Name = document.getElementById('player1').value.trim() || 'Player 1';
        const player2Name = document.getElementById('player2').value.trim() || 'Player 2';

        if (player1Name === player2Name) {
            alert('Player names must be different!');
            return false;
        }

        player1 = createPlayer(player1Name, 'X');
        player2 = createPlayer(player2Name, 'O');
        currentPlayer = player1; // Start with player 1
        return true;
    };

    const game = (function() {
        let board = createBoard();

        const makeMove = (row, col) => {
            if (board[row][col] === '') {
                board[row][col] = currentPlayer.symbol;
                printBoard(board);

                if (checkWin()) {
                    setTimeout(() => { // Delay win message for visual effect
                        alert(`${currentPlayer.name} wins!`);
                        showResults(`${currentPlayer.name} wins!`);
                    }, 100);
                    resetGame();
                } else if (board.flat().every(cell => cell !== '')) {
                    alert('It\'s a draw!');
                    showResults('It\'s a draw!');
                    resetGame();
                } else {
                    currentPlayer = (currentPlayer === player1) ? player2 : player1; // Switch players
                }
            } else {
                alert('Cell already taken! Choose another.');
            }
        };

        const checkWin = () => {
            const winPatterns = [
                // Rows
                [[0, 0], [0, 1], [0, 2]],
                [[1, 0], [1, 1], [1, 2]],
                [[2, 0], [2, 1], [2, 2]],
                // Columns
                [[0, 0], [1, 0], [2, 0]],
                [[0, 1], [1, 1], [2, 1]],
                [[0, 2], [1, 2], [2, 2]],
                // Diagonals
                [[0, 0], [1, 1], [2, 2]],
                [[0, 2], [1, 1], [2, 0]]
            ];

            return winPatterns.some(pattern => {
                const [a, b, c] = pattern;
                return board[a[0]][a[1]] !== '' &&
                    board[a[0]][a[1]] === board[b[0]][b[1]] &&
                    board[a[0]][a[1]] === board[c[0]][c[1]];
            });
        };

        const resetGame = () => {
            board = createBoard();
            currentPlayer = player1; // Reset to player 1
            printBoard(board);
        };

        // Return the makeMove function and other necessary functions
        return {
            makeMove,
            resetGame
        };
    })();

    // Function to show game results
    const showResults = (result) => {
        const resultsDiv = document.getElementById('results');
        resultsDiv.textContent = result;
    };

    // Event listener for the start/restart game button
    const startButton = document.getElementById('start-game');
    startButton.addEventListener('click', () => {
        if (createPlayersFromInput()) {
            game.resetGame();
        }
    });

    // Initialize the game board initially
    printBoard(createBoard());

    // Expose makeMove function globally if needed
    return {
        makeMove: game.makeMove
    };
})();
