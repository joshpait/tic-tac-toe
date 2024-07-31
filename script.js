const createBoard = () => {
    let board = [
        ['', '', ''],
        ['', '', ''],
        ['', '', '']
    ];

    const setMove = (row, col, player) => {
        if (board[row][col] === '') {
            board[row][col] = player;
            return true;
        }
        return false;
    };

    const getBoard = () => board;

    return { setMove, getBoard };
};

const createGame = (player1Name, player2Name) => {
    const board = createBoard();
    const player1 = { name: player1Name, token: 'X' };
    const player2 = { name: player2Name, token: 'O' };
    let currentPlayer = player1;
    let gameEnded = false;

    const switchPlayer = () => {
        currentPlayer = currentPlayer === player1 ? player2 : player1;
    };

    const checkWin = () => {
        const b = board.getBoard();

        // Check rows
        for (let row of b) {
            if (row[0] === row[1] && row[1] === row[2] && row[0] !== '') {
                return row[0];
            }
        }

        // Check columns
        for (let col = 0; col < 3; col++) {
            if (b[0][col] === b[1][col] && b[1][col] === b[2][col] && b[0][col] !== '') {
                return b[0][col];
            }
        }

        // Check diagonals
        if (b[0][0] === b[1][1] && b[1][1] === b[2][2] && b[0][0] !== '') {
            return b[0][0];
        }

        if (b[0][2] === b[1][1] && b[1][1] === b[2][0] && b[0][2] !== '') {
            return b[0][2];
        }

        return null;
    };

    const checkDraw = () => {
        const b = board.getBoard();
        return b.flat().every(cell => cell !== '');
    };

    const play = (row, col) => {
        if (gameEnded) {
            return;
        }

        if (board.setMove(row, col, currentPlayer.token)) {
            updateBoardUI();
            const winner = checkWin();
            if (winner) {
                setMessage(`Congratulations ${currentPlayer.name}! You win!`);
                showModal(`Congratulations ${currentPlayer.name}! You win!`);
                gameEnded = true;
                return;
            }
            if (checkDraw()) {
                setMessage("It's a draw!");
                showModal("It's a draw!");
                gameEnded = true;
                return;
            }
            switchPlayer();
            setMessage(`Current Player: ${currentPlayer.name} (${currentPlayer.token})`);
        } else {
            setMessage('Invalid move, try again.');
        }
    };

    const updateBoardUI = () => {
        const b = board.getBoard();
        b.forEach((row, rowIndex) => {
            row.forEach((cell, colIndex) => {
                const cellElement = document.getElementById(`cell-${rowIndex}-${colIndex}`);
                cellElement.textContent = cell;
            });
        });
    };

    const setMessage = (message) => {
        const messageElement = document.getElementById('message');
        messageElement.textContent = message;
    };

    const showModal = (message) => {
        const modal = document.getElementById('modal');
        const modalMessage = document.getElementById('modal-message');
        modalMessage.textContent = message;
        modal.style.display = 'block';
    };

    return { play, getCurrentPlayer: () => currentPlayer, board };
};

const startGame = () => {
    const player1Name = document.getElementById('player1').value;
    const player2Name = document.getElementById('player2').value;

    if (!player1Name || !player2Name) {
        alert('Please enter names for both players.');
        return;
    }

    game = createGame(player1Name, player2Name);

    document.getElementById('player-names-form').style.display = 'none';
    document.getElementById('player-info').style.display = 'block';
    document.getElementById('board').style.display = 'grid';
    document.getElementById('player1-info').textContent = `${player1Name} (X)`;
    document.getElementById('player2-info').textContent = `${player2Name} (O)`;

    // Reset the board display
    const cells = document.querySelectorAll('.cell');
    cells.forEach(cell => cell.textContent = '');

    setMessage(`Current Player: ${game.getCurrentPlayer().name} (${game.getCurrentPlayer().token})`);
};

const startNewGame = () => {
    const modal = document.getElementById('modal');
    modal.style.display = 'none';

    document.getElementById('player-names-form').style.display = 'block';
    document.getElementById('player-info').style.display = 'none';
    document.getElementById('board').style.display = 'none';
    document.getElementById('message').textContent = '';

    // Clear input fields
    document.getElementById('player1').value = '';
    document.getElementById('player2').value = '';
};

const initGame = () => {
    const boardElement = document.getElementById('board');
    for (let row = 0; row < 3; row++) {
        for (let col = 0; col < 3; col++) {
            const cellElement = document.createElement('div');
            cellElement.id = `cell-${row}-${col}`;
            cellElement.classList.add('cell');
            cellElement.addEventListener('click', () => game.play(row, col));
            boardElement.appendChild(cellElement);
        }
    }
};

window.onload = () => {
    initGame();
    document.getElementById('player-names-form').style.display = 'block';
};
