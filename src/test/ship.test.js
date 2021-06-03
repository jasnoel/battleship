const Ship = require('../factory/ship.js');

it('happy path', () => {
  const shipA = Ship(4);
  expect(shipA.hit(1)).toBe(true);
})

it('hit ship ', () => {
  const shipA = Ship(4);
  expect(shipA.hit(7)).toBe(false);
})

it('hit a 1 lenght ship', () => {
  const shipA = Ship(1);
  expect(shipA.hit(1)).toBe(true);
})

it("ship isn't sunk", () => {
  const shipA = Ship(3);
  expect(shipA.isSunk()).toBe(false);
})

it("ship is sunk", () => {
  const shipA = Ship(1);
  shipA.hit(1);
  expect(shipA.isSunk()).toBe(true);
})
