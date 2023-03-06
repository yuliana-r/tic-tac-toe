/* eslint-disable no-param-reassign */
/* eslint-disable no-use-before-define */
const Player = (mark) => {
  this.mark = mark;
  const getMark = () => mark;
  return {
    getMark,
  };
};

const gameFlow = (() => {
  const playerX = Player('x');
  const playerO = Player('o');

  let currentPlayer = playerX;

  const switchPlayer = () => {
    currentPlayer = currentPlayer === playerX ? playerO : playerX;
  };

  const getCurrentPlayerMark = () => currentPlayer.getMark();

  return {
    switchPlayer,
    getCurrentPlayerMark,
  };
})();

const Gameboard = (() => {
  const board = new Array(9).fill('');
  const cells = document.querySelectorAll('.cell');
  const gameStatusMessage = document.getElementById('game-status');
  const restartBtn = document.querySelector('#reset');
  const currentPlayerTurn = () => `${gameFlow.getCurrentPlayerMark().toUpperCase()} - it is your turn`;
  gameStatusMessage.innerText = currentPlayerTurn();

  const checkForWin = (marker) => {
    const winConditions = [
      [0, 1, 2],
      [3, 4, 5],
      [6, 7, 8],
      [0, 3, 6],
      [1, 4, 7],
      [2, 5, 8],
      [0, 4, 8],
      [2, 4, 6],
    ];

    return winConditions
      .some((combination) => combination
        .every((index) => getCell(index) === marker));
  };

  const setCell = (index) => {
    board[index] = gameFlow.getCurrentPlayerMark();
  };

  const getCell = (index) => board[index];

  const resetBoard = () => {
    board.fill('');
    cells.forEach((cell) => resetCell(cell));
    if (gameFlow.getCurrentPlayerMark() === 'o') { gameFlow.switchPlayer(); }
    gameStatusMessage.innerText = currentPlayerTurn();
    document.getElementById('gameboard').style.pointerEvents = 'auto';
  };

  function resetCell(c) {
    c.innerText = '';
    c.className = 'cell';
  }

  cells.forEach((cell) => cell.addEventListener('click', (e) => {
    const i = parseInt(e.target.dataset.index, 10);
    if (cell.innerText !== '') return;
    setCell(i);
    const filtered = board.filter((n) => n === '');
    cell.innerText = gameFlow.getCurrentPlayerMark();
    cell.classList.add(gameFlow.getCurrentPlayerMark());
    if (checkForWin(gameFlow.getCurrentPlayerMark())) {
      gameStatusMessage.innerText = `${gameFlow.getCurrentPlayerMark().toUpperCase()} wins the game!`;
      document.getElementById('gameboard').style.pointerEvents = 'none';
    } else {
      gameFlow.switchPlayer();
      gameStatusMessage.innerText = currentPlayerTurn();
    }

    if (filtered.length === 0 && !checkForWin(gameFlow.getCurrentPlayerMark())) {
      gameStatusMessage.innerText = 'It\'s a tie!';
    }
  }));

  restartBtn.addEventListener('click', () => resetBoard());
})();
