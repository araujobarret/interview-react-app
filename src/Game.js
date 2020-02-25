import React, { useState, useEffect } from 'react';

import GameService from './GameService';

const STACK_LENGTH = 7;
const STACK_HEIGHT = 6;

export default function Game() {
  const gameService = new GameService(STACK_LENGTH, STACK_HEIGHT);

  const emptyBlocks = gameService.getEmptyBlocks();
  const initialStacks = [];
  for (let i = 0; i < STACK_LENGTH; i++) {
    initialStacks.push([...emptyBlocks]);
  }
  const [stacks, setStacks] = useState(initialStacks);

  const players = ["red", "blue"];
  const [currentPlayer, switchCurrentPlayer] = useState(
    Math.floor(Math.random() * 2)
  );
  const [winner, setWinner] = useState(null);

  useEffect(() => {
    handleAddPiece(0);
    handleAddPiece(1);
    handleAddPiece(0);
    handleAddPiece(1);
    handleAddPiece(0);
    handleAddPiece(1);
    handleAddPiece(0);
  }, []);

  const checkWinner = (player, x, y) => {
    if (gameService.checkWon(stacks, player, x, y)) {
      setWinner(player);
    } else {
      switchCurrentPlayer(currentPlayer === 0 ? 1 : 0);
    }
  };

  const handleAddPiece = stackIndex => {
    if (winner !== null) {
      return;
    }

    const nextStackSlot = stacks[stackIndex].indexOf(" ");
    const newStacks = stacks;
    if (nextStackSlot !== -1) {
      newStacks[stackIndex][nextStackSlot] = players[currentPlayer];
      setStacks(newStacks);
      checkWinner(players[currentPlayer], stackIndex, nextStackSlot);
    }
  };
  
  return (
    <div>
      {winner && <div className="message">{`Player ${winner} has won!`}</div>}
      <div className="board">
        {stacks.map(stack => (
          <div className="boardStack">
          {stack.map(s => <div>{s !== ' ' ? s : '# '}</div>)}
          </div>
        ))}
      </div>
    </div>
  );
}
