const Ship = (lengthInput) => {
  length = parseInt(lengthInput);
  let sunk = false;
  let ship = [];
  for (let i = 0; i < length; i++) {
    ship.push(false);
  }

  const hit = (position) => {
    if (position > length) {
      return false;
    }
    if (ship[position - 1] = true) {
      return true;
    } else {
      return false;
    }
  }

  const isSunk = () => {
    if (sunk) {
      return true;
    }
    for (let i = 0; i < length; i++) {
      if (ship[i] == false) {
        return false;
      }
    }
    sunk = true;
    return true;
  }
  
  return { hit, isSunk };
}

module.exports = Ship;