export default class GameService {
  _stackHeight;
  _stackLength;

  constructor(stackLength, stackHeight) {
    this._stackLength = stackLength;
    this._stackHeight = stackHeight;
  }

  _getStartCoordinateAntiDiagonal(x, y) {
    const coord = { x, y };
    while (coord.x > 0 && coord.y > 0) {
      coord.x--;
      coord.y--;
    }
    return coord;
  }

  _getStartCoordinateMainDiagonal(x, y) {
    const coord = { x, y };
    while (coord.x > 0 && coord.y < this._stackHeight) {
      coord.x--;
      coord.y++;
    }
    return coord;
  }

  _checkAntiDiagonal(stacks, player, x, y) {
    const coord = this._getStartCoordinateAntiDiagonal(x, y);
    while (coord.x < this._stackLength && coord.y < this._stackHeight) {
      let sum = 0;

      for (let i = 0; i < 4; i++) {
        if (
          stacks[coord.x + i] &&
          stacks[coord.x + i][coord.y + i] &&
          stacks[coord.x + i][coord.y + i] === player
        ) {
          sum++;
        } else {
          break;
        }
      }

      if (sum >= 4) {
        return true;
      }
      coord.x++;
      coord.y++;
    }
    return false;
  }

  _checkMainDiagonal(stacks, player, x, y) {
    const coord = this._getStartCoordinateAntiDiagonal(x, y);
    while (coord.x < this._stackLength && coord.y >= 0) {
      let sum = 0;
      for (let i = 0; i < 4; i++) {
        if (
          stacks[coord.x + i] &&
          stacks[coord.x + i][coord.y - i] &&
          stacks[coord.x + i][coord.y - i] === player
        ) {
          sum++;
        } else {
          break;
        }
      }

      if (sum >= 4) {
        return true;
      }
      coord.x++;
      coord.y--;
    }
    return false;
  }

  _checkHorizontal(stacks, player, y) {
    for (let i = 0; i < this._stackLength - 3; i++) {
      let sum = 0;

      for (let j = i; j < i + 4; j++) {
        if (stacks[j][y] === player) {
          sum++;
        } else {
          break;
        }
      }

      if (sum >= 4) {
        return true;
      }
    }
    return false;
  }

  _checkVertical(stacks, player, x) {
    for (let i = 0; i < this._stackHeight - 3; i++) {
      let sum = 0;

      for (let j = i; j < i + 4; j++) {
        if (stacks[x][j] === player) {
          sum++;
        } else {
          break;
        }
      }

      if (sum >= 4) {
        return true;
      }
    }
    return false;
  }

  getEmptyBlocks () {
    const emptyBlocks = [];
    for (let i = 0; i < this._stackHeight; i++) {
      emptyBlocks.push(" ");
    }
    return emptyBlocks
  }

  checkWon(stacks, player, x, y) {
    return (
      this._checkHorizontal(stacks, player, y) ||
      this._checkVertical(stacks, player, x) ||
      this._checkMainDiagonal(stacks, player, x, y) ||
      this._checkAntiDiagonal(stacks, player, x, y)
    );
  }
}