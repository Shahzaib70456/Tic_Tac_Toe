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
      <div className="board-row">
        <Square className = {squares.classNames[0]} value={squares.values[0]} onSquareClick={() => handleClick(0)} />
        <Square className = {squares.classNames[1]} value={squares.values[1]} onSquareClick={() => handleClick(1)} />
        <Square className = {squares.classNames[2]} value={squares.values[2]} onSquareClick={() => handleClick(2)} />
      </div>
      <div className="board-row">
        <Square className = {squares.classNames[3]} value={squares.values[3]} onSquareClick={() => handleClick(3)} />
        <Square className = {squares.classNames[4]} value={squares.values[4]} onSquareClick={() => handleClick(4)} />
        <Square className = {squares.classNames[5]} value={squares.values[5]} onSquareClick={() => handleClick(5)} />
      </div>
      <div className="board-row">
        <Square className = {squares.classNames[6]} value={squares.values[6]} onSquareClick={() => handleClick(6)} />
        <Square className = {squares.classNames[7]} value={squares.values[7]} onSquareClick={() => handleClick(7)} />
        <Square className = {squares.classNames[8]} value={squares.values[8]} onSquareClick={() => handleClick(8)} />
      </div>
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
