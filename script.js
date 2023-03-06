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
  const restartBtn = document.querySelector('#reset');

  const switchPlayer = () => {
    currentPlayer = currentPlayer === playerX ? playerO : playerX;
  };

  const getCurrentPlayerMark = () => currentPlayer.getMark();

  restartBtn.addEventListener('click', () => Gameboard.resetBoard());

  return {
    switchPlayer,
    getCurrentPlayerMark,
  };
})();

const Gameboard = (() => {
  const board = new Array(9).fill('');
  const cells = document.querySelectorAll('.cell');
  const gameStatusMessage = document.getElementById('game-status');

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
  const getBoard = () => [...board];
  const resetBoard = () => {
    board.fill('');
    cells.forEach((cell) => resetCell(cell));
    if (gameFlow.getCurrentPlayerMark() === 'o') {
      gameFlow.switchPlayer();
    }
    gameStatusMessage.innerText = currentPlayerTurn();
  };

  function resetCell(c) {
    c.innerText = '';
    c.className = 'cell';
  }

  cells.forEach((cell) => cell.addEventListener('click', (e) => {
    const i = parseInt(e.target.dataset.index, 10);
    if (cell.innerText !== '') return;
    setCell(i);
    cell.innerText = gameFlow.getCurrentPlayerMark();
    cell.classList.add(gameFlow.getCurrentPlayerMark());
    if (checkForWin(gameFlow.getCurrentPlayerMark())) {
      gameStatusMessage.innerText = `${gameFlow.getCurrentPlayerMark().toUpperCase()} wins the game!`;
      console.log('current player wins');
    } else {
      gameStatusMessage.innerText = currentPlayerTurn();
      gameFlow.switchPlayer();
    }
  }));

  const isGameOver = () => {

  };

  const currentPlayerTurn = () => `${gameFlow.getCurrentPlayerMark().toUpperCase()} - it is your turn`;
  gameStatusMessage.innerText = currentPlayerTurn();

  return {
    setCell,
    getCell,
    getBoard,
    checkForWin,
    resetBoard,
  };
})();
