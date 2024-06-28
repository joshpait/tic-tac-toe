const TicTacToe = (function() {

    const createBoard = () => {
        let board = [];

        for(let i = 0; i < 3; i++) {
            board[i] = [];
            for(let j = 0; j < 3; j++) {
                board[i][j] = '';
            }
        }
        return { board };
    };

    const createPlayers = (name, symbol) => { name, symbol };

    const game = (function() {
        let board = createBoard();
        let currentPlayerIndex = 0;
        const players = [
            createPlayers('Player1', 'X'),
            createPlayers('Player2', 'O')
        ];

        const printBoard = () => {
            console.clear();
            console.log(board.map(row => row.join(' | ')).join('\n---------\n'));
        };

        const makeMove = (row, col) => {
            
        }

    })();

    return {
        createBoard,
        printBoard
    }

})();

const gameBoard = TicTacToe.createBoard();
TicTacToe.printBoard(gameBoard.board);