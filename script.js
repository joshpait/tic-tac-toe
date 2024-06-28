const TicTacToe = (function() {

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

    const createPlayers = (name, symbol) => { 
        return {
            name,
            symbol
        }
    };

    const game = (function() {
        let board = createBoard();
        let currentPlayerIndex = 0;
        const players = [
            createPlayers('Player1', 'X'),
            createPlayers('Player2', 'O')
        ];

        const printBoard = () => {
            console.log(board.map(row => row.join(' | ')).join('\n---------\n'));
        };

        const makeMove = (row, col) => {
            if (board[row][col] === '') {
                board[row][col] = players[currentPlayerIndex].symbol;
                printBoard();

                if (checkWin()) {
                    console.log(`${players[currentPlayerIndex].name} wins!`);
                    resetGame();
                } else if (board.flat().every(cell => cell !== '')) {
                    console.log('It\'s a draw!');
                    resetGame();
                } else {
                    currentPlayerIndex = (currentPlayerIndex + 1) % 2;
                }
            }
            else {
                console.log('Cells already taken!');
            }
        }

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
            currentPlayerIndex = 0;
            printBoard(board);
        };
        
        return {
            makeMove
        };
    })();

    return {
        makeMove: game.makeMove
    };
})();

TicTacToe.makeMove(0, 0);
TicTacToe.makeMove(0, 1);
TicTacToe.makeMove(1, 0);
TicTacToe.makeMove(1, 1);
TicTacToe.makeMove(2, 0);