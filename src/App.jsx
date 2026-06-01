import { useState, useRef } from 'react';
import './css/App.css'

function Square({ value, onSquareClick, className }) {
  return (
    <button className={className} onClick={onSquareClick}>
      {value}
    </button>
  );
}

function Board({ xIsNext, squares, onPlay, history }) {

  const count = [0, 1, 2];
  const count2 = [0, 1, 2];

  function handleClick(i) {
    if (calculateWinner(squares) || squares.values[i]) {
      return;
    }
    const nextSquares = squares.values.slice();
    if (xIsNext) {
      nextSquares[i] = 'X';
    } else {
      nextSquares[i] = 'O';
    }
    onPlay(nextSquares);
  }

  const winner = calculateWinner(squares);
  const isDraw = !winner && history.length === 10; 

  let status;
  if (winner) {
    status = winner + ' has won the game!';
  } else if (isDraw) {
    status = 'Game is tied!';
  } else {
    status = 'Player ' + (xIsNext ? 'X' : 'O') + "'s turn";
  }

  return (
  <>
    <div className="status">{status}</div>
    {count.map((row) => (
      <div className="board-row" key={row}>
        {count2.map((col) => {
          const index = col + row * 3;
          return (
            <Square 
              className={squares.classNames[index]}
              value={squares.values[index]}
              onSquareClick={() => handleClick(index)}
              key={index}
            />
          );
        })}
      </div>
    ))}
  </>
);
}

export default function Game({ handleStart }) {
  const [xIsNext, setXIsNext] = useState(true);
  const [history, setHistory] = useState([Array(9).fill(null)]);
  const currentSquares = { 
      values: history[history.length - 1],
      classNames: Array(9).fill("square")
  };

  function handlePlay(nextSquares) {
    setHistory([...history, nextSquares]);
    setXIsNext(!xIsNext);
  }

  function jumpTo(nextMove) {
    setHistory(history.slice(0, nextMove+1));
    setXIsNext(nextMove % 2 === 0);
  }

  const moves = history.map((squares, move) => {
    let description;
    if (move === history.length - 1) {
          return;
    }

    if (move > 3) {
      description = move + "th move";
    } else if (move === 1) {
      description = move + "st move";
    } else if (move === 2) {
      description = move + "nd move";
    } else if (move === 3) {
      description = move + "rd move";
    } else {
        return (
        <li className="move" key={move}>
          <button onClick={() => {
              jumpTo(move);
              handleStart(false);
          }}>{'Game Start'}</button>
        </li>
      );
    }
    return (
      <li className="move" key={move}>
        <button onClick={() => jumpTo(move)}>{description}</button>
      </li>
    );
  });

  return (
    <div className="game">
      <div className="game-board">
        <Board xIsNext={xIsNext} squares={currentSquares} onPlay={handlePlay} history={history} />
      </div>
      {history.length > 1 && (
        <div className="game-info">
          <h2>Go back to: </h2>
          <div className="moves-list">
            {moves}
          </div>
      </div> )}
    </div>
  );
}

function calculateWinner(squares) {
  const lines = [
    [0, 1, 2],
    [3, 4, 5],
    [6, 7, 8],
    [0, 3, 6],
    [1, 4, 7],
    [2, 5, 8],
    [0, 4, 8],
    [2, 4, 6],
  ];
  for (let i = 0; i < lines.length; i++) {
    const [a, b, c] = lines[i];
    if (squares.values[a] && squares.values[a] === squares.values[b] && squares.values[a] === squares.values[c]) {
        squares.classNames[a] = "square winning-square";
        squares.classNames[b] = "square winning-square";
        squares.classNames[c] = "square winning-square";
      return squares.values[a];
    }
  }
  return null;
}
