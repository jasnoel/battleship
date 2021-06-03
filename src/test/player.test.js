const Player = require('../factory/player.js');

it('miss the shot', () => {
  const playerA = Player();
  const playerB = Player();
  expect(playerA.attack(1, 1, playerB.getGameBoard())).toBe(false);
})

it('touch the shot', () => {
  const playerA = Player();
  const playerB = Player();
  playerB.getGameBoard().placeShip(1,1,2, true);
  expect(playerA.attack(1, 1, playerB.getGameBoard())).toBe(true);
})

it('touch the shot', () => {
  const playerA = Player();
  const playerB = Player();
  playerB.getGameBoard().placeShip(1,1,2, true);
  expect(playerA.attack(1, 1, playerB.getGameBoard())).toBe(true);
})

it('shot at the same spot', () => {
  const playerA = Player();
  const playerB = Player();
  playerB.getGameBoard().placeShip(1,1,2, true);
  expect(playerA.attack(1, 1, playerB.getGameBoard())).toBe(true);
  expect(playerA.attack(1, 1, playerB.getGameBoard())).toBe(false);
})

it('random shots', () => {
  const playerA = Player();
  const playerB = Player();
  playerB.getGameBoard().placeShip(1,1,2, true);

  for (let i = 0; i < 64; i++) {
    playerA.randomAttack(playerB.getGameBoard());
  }
  expect(playerA.randomAttack(playerB.getGameBoard())).toBe(false);
})
