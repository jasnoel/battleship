const Ship = require('./ship');

const BATTLESHIP_LENGHT = 8;

const GameBoard = () => {
  let logs = [];
  let grid = [];
  let shipsList = [];
  for (let i = 0; i < BATTLESHIP_LENGHT; i++) {
    let row = [];
    for (let j = 0; j < BATTLESHIP_LENGHT; j++) {
      row.push({state: 'void'});
    }
    grid.push(row);
  }

  const getLogs = () => logs;

  const areSunk = () => {
    for (let ship of shipsList) {
      if (!ship.isSunk()) {
        return false;
      }
    }
    return true;
  }

  const receiveAttack = (col, row) => {
    let log = { col: col, row: row };
    if (grid[col][row].state == 'void') {
      log.shot = 'missed';
      logs.push(log);
      return false;
    } else {
      log.shot = 'hit';
      logs.push(log);
      if (!grid[col][row].ship.hit(grid[col][row].position)) {
        return false;
      }
      return true;
    }
  }

  const placeShip = (col, row, length, horizontal) => {
    //verifications
    if (horizontal) {
      if (row + length > BATTLESHIP_LENGHT) {
        return false;
      }
      for (let i = 0; i < length; i++) {
        if (grid[col][row + i].state != 'void') {
          return false;
        }
      }
    }
    if (!horizontal) {
      if (col + length > BATTLESHIP_LENGHT) {
        return false;
      }
      for (let i = 0; i < length; i++) {
        if (grid[col + i][row].state != 'void') {
          return false;
        }
      }
    }
    //operations
    let newShip = Ship(length);
    shipsList.push(newShip);
    for (let i = 0; i < length; i++) {
      if (horizontal) {
        grid[col][row + i] = {
          state: 'occupied',
          ship: newShip,
          position: i + 1,
        };
      } else {
        grid[col + i][row] = {
        state: 'occupied',
        ship: newShip,
        position: i + 1,
      };
      }
    }
    return true;
  }

  return {placeShip, receiveAttack, getLogs, areSunk };
}

module.exports = GameBoard;
