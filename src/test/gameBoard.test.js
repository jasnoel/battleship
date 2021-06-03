const GameBoard = require('../factory/gameBoard.js');

describe('place the ship', () => {
    it('happy path gameboard', () => {
    let gameBoardA = GameBoard();
    expect(gameBoardA.placeShip(0, 0, 2, true)).toBe(true);
  })

  it('out of gameboard', () => {
    let gameBoardB = GameBoard();
    expect(gameBoardB.placeShip(0, 7, 2, true)).toBe(false);
    expect(gameBoardB.placeShip(0, 7, 1, true)).toBe(true);
  })

  it('on another ship', () => {
    let gameBoardA = GameBoard();
    expect(gameBoardA.placeShip(0, 2, 2, true)).toBe(true);
    expect(gameBoardA.placeShip(0, 1, 2, true)).toBe(false);
    expect(gameBoardA.placeShip(0, 2, 2, true)).toBe(false);
  })

  it('verticality and horizontality',() => {
  let gameBoardA = GameBoard();
    expect(gameBoardA.placeShip(1, 2, 2, true)).toBe(true);
    expect(gameBoardA.placeShip(0, 2, 2, false)).toBe(false);
    expect(gameBoardA.placeShip(7, 3, 2, false)).toBe(false);
    expect(gameBoardA.placeShip(6, 3, 2, false)).toBe(true);
  });
})

it('happy received attacked', () => {
  let gameBoardA = GameBoard();
  gameBoardA.placeShip(1,0,2,true);
  expect(gameBoardA.receiveAttack(0, 0)).toBe(false);
  expect(gameBoardA.receiveAttack(1, 0)).toBe(true);
  expect(gameBoardA.receiveAttack(1, 2)).toBe(false);
})

it('get logs', () => {
  let gameBoardA = GameBoard();
  gameBoardA.placeShip(1,0,2,true);
  gameBoardA.receiveAttack(1, 0);
  gameBoardA.receiveAttack(1, 2);
  expect(gameBoardA.getLogs()).toStrictEqual([
    {"col": 1, "row": 0, "shot": "hit"},
    {"col": 1, "row": 2, "shot": "missed"}
  ]);
})

it('sunk a ship', () => {
  let gameBoardA = GameBoard();
  gameBoardA.placeShip(1, 0, 2, true);
  gameBoardA.receiveAttack(1, 0);
  expect(gameBoardA.areSunk()).toBe(false);
  gameBoardA.receiveAttack(1, 1);
  expect(gameBoardA.areSunk()).toBe(true);
  gameBoardA.placeShip(5,5,2,true);
  expect(gameBoardA.areSunk()).toBe(false);
})
