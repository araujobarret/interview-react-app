import React, { useState, useEffect } from 'react';

import GameService from './GameService';

export default function Game() {
  const gameService = new GameService(7, 6);
  const [stacks, setStacks] = useState([]);

  useEffect(() => {
    let emptyBlocks = [];
    for (let i = 0; i < 6; i++) {
      emptyBlocks.push(" ");
    }

    const initialStacks = [];
    for (let i = 0; i < 7; i++) {
      initialStacks.push([...emptyBlocks]);
    }
    setStacks(initialStacks);
  }, []);
  
  return (
    <div className="Game">
      {stacks.map(stack => stack.map(s => <div>{s !== ' ' ? s : '# '}</div>))}
    </div>
  );
}
