export default class GameService {
  _stackHeight;
  _stackLength;

  constructor(stackLength, stackHeight) {
    this._stackLength = stackLength;
    this._stackHeight = stackHeight;
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
      this._checkVertical(stacks, player, x)
    );
  }
}