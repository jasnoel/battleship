const GameBoard = require('./gameBoard.js');

const BATTLESHIP_LENGHT = 8;

const Player = () => {
  let gameBoard = GameBoard();
  let possibleShots = [];
  for (let i = 0; i < BATTLESHIP_LENGHT; i++) {
    for (let j = 0; j < BATTLESHIP_LENGHT; j++) {
      possibleShots.push({col: i, row: j});
    }
  }

  const getGameBoard = () => gameBoard;

  const attack = (col, row, enemyGameBoard) => {
    const shotIndex = possibleShots.findIndex((shot) => {
      if (shot.col == col && shot.row == row) {
        return true;
      }
    })
    if (shotIndex != -1) {
      possibleShots.splice(shotIndex, 1);
    }
    return enemyGameBoard.receiveAttack(col, row);
  }

  const randomAttack = (enemyGameBoard) => {
    //if no more shots available
    if (possibleShots.length <= 0) {
      return attack(1, 1, enemyGameBoard);
    } else {
      const index = Math.floor(Math.random() * possibleShots.length);
      const col = possibleShots[index].col;
      const row = possibleShots[index].row;
      return attack(col, row, enemyGameBoard);
    }
  }

  return { getGameBoard, attack, randomAttack };
}

module.exports = Player;
