const GameBoard = require('./gameBoard.js');

const BATTLESHIP_LENGHT = 8;

const Player = () => {
  let gameBoard = GameBoard();
  let possibleShots = [];
  let niceSpot = {col: -1, row: -1};
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
      attack(1, 1, enemyGameBoard);
      return { result: false, col: -1, row: -1 };
    } else {
      let col = null;
      let row = null;
      //shoot near lasthit
      if (niceSpot.col != -1) {
        for (const shot of possibleShots) {
          if (shot.col == niceSpot.col + 1 && shot.row == niceSpot.row
            || shot.col == niceSpot.col + -1 && shot.row == niceSpot.row
            || shot.col == niceSpot.col && shot.row == niceSpot.row + 1
            || shot.col == niceSpot.col && shot.row == niceSpot.row - 1 )
           {
            col = shot.col;
            row = shot.row;
            break;
          }
        }
        if (col == null) {
          niceSpot = {col: -1, row: -1};
          const index = Math.floor(Math.random() * possibleShots.length);
          col = possibleShots[index].col;
          row = possibleShots[index].row;
        }
      } else {
        const index = Math.floor(Math.random() * possibleShots.length);
        col = possibleShots[index].col;
        row = possibleShots[index].row;
      }
      const result = attack(col, row, enemyGameBoard);
      if (result) {
        niceSpot = {col, row};
      }
      return {result, col, row};
    }
  }

  return { getGameBoard, attack, randomAttack };
}

module.exports = Player;
