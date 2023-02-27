/* eslint-disable no-use-before-define */
/* eslint-disable no-param-reassign */
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
    // currentPlayer = currentPlayer === playerX ? playerO : playerX;
    if (currentPlayer === playerX) {
      currentPlayer = playerO;
      console.log(currentPlayer.getMark());
    } else {
      currentPlayer = playerX;
      console.log(currentPlayer.getMark());
    }
  };

  const getCurrentPlayer = () => currentPlayer;

  return {
    switchPlayer,
    getCurrentPlayer,
  };
})();

const Gameboard = (() => {
  const board = new Array(9).fill('');
  const cells = document.querySelectorAll('.cell');
  const restartBtn = document.querySelector('#reset');

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
  };

  const setCell = (index) => {
    // console.log(board);
    board[index] = gameFlow.getCurrentPlayer().getMark();

    console.log(`current -${gameFlow.getCurrentPlayer().getMark()}`);
    // gameFlow.switchPlayer();

    // cell.innerText = gameFlow.currentPlayer.getMark();
  };

  const getCell = (index) => board[index];
  const getBoard = () => [...board];
  const resetBoard = () => {
    board.fill('');
    console.log(board);
    cells.forEach((cell) => resetCell(cell));
    // gameFlow.currentPlayer = 'X';
    // gameFlow.gameStatusMessage.innerText = gameFlow.currentPlayerTurn;
  };

  // function handleClick(e) {
  //   const clickedCell = e.target;
  //   console.log(clickedCell);
  //   const clickedCellIndex = parseInt(clickedCell.getAttribute('data-index'));
  //   console.log(clickedCellIndex);
  //   console.log(board[clickedCellIndex]);

  //   if (board[clickedCellIndex] === '') {
  //     setCell(clickedCell, clickedCellIndex);
  //   }
  // }

  function resetCell(c) {
    c.innerText = '';
    c.className = 'cell';
  }

  cells.forEach((cell) => cell.addEventListener('click', (e) => {
    const i = parseInt(e.target.dataset.index, 10);
    setCell(i);
    console.log(board);
    cell.innerText = gameFlow.getCurrentPlayer().getMark();
    cell.classList.add(gameFlow.getCurrentPlayer().getMark());
    gameFlow.switchPlayer();

    // updateBoard();
  }));

  function handleClick() {
  }

  restartBtn.addEventListener('click', () => resetBoard());

  return {
    setCell,
    getCell,
    getBoard,
    checkForWin,
    resetBoard,
  };
})();

const displayController = (() => {
  const gameStatusMessage = document.getElementById('game-status');
  const currentPlayerTurn = () => `It's ${gameFlow.getCurrentPlayer().getMark()}'s turn`;
  gameStatusMessage.innerText = currentPlayerTurn();
})();
