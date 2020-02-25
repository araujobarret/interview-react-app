import React from "react";

export default function BoardStack({ stack, index, onAddPiece }) {
  const handleOnAddPiece = () => onAddPiece(index);

  const renderPiece = (s, pieceIndex) => {
    if (s === " ") {
      return (
        <div className="boardPiece" key={`board_${index}_${pieceIndex}`}>
          <div className="emptyPiece" />
        </div>
      );
    } else {
      return (
        <div className="boardPiece" key={`board_${index}_${pieceIndex}`}>
          <div className={s} />
        </div>
      );
    }
  };

  const renderPieces = () => {
    const pieces = [];
    for (let i = stack.length - 1; i >= 0; i--) {
      pieces.push(renderPiece(stack[i], i));
    }
    return pieces;
  };

  return (
    <div className="boardStack" onClick={handleOnAddPiece}>
      {renderPieces()}
    </div>
  );
}
