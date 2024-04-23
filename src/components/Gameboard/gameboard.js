import { useState } from 'react';
import './gameboard.css'
import ScoreBoard from '../ScoreBoard/score';
import ComputationBox from '../MathTester/quiz';

function Square({ value, onSquareClick, answeredCorrectly }) {
  return (
    <button disabled={!answeredCorrectly} className="square" onClick={onSquareClick}>
      {value}
    </button>
  );
}



export default function Game({answeredCorrectly, currentPlayer, handleTilePicked, handleWinner, status, resetBoard, handleDraw, overallWin}) {
  const [history, setHistory] = useState([Array(9).fill(null)]);
  const [currentMove, setCurrentMove] = useState(0);
  const currentSquares = history[currentMove];

  function handleClick(i) {
    if (currentSquares[i]) {
      return;
    }
    const nextSquares = currentSquares.slice();
    if (currentPlayer === "X") {
      nextSquares[i] = 'X';
    } else {
      nextSquares[i] = 'O';
    }
    handleTilePicked();
    handlePlay(nextSquares);
    if (calculateWinner(nextSquares)) {
      handleWinner();
      return;
    }
    if (!(nextSquares.some((s) => s == null))) {
      handleDraw();
    }
  }

  function Board() {
    return (
      <div className="the-board">
        <div className="status">{status}</div>
        <div className="board-row">
          <Square value={currentSquares[0]} answeredCorrectly={answeredCorrectly} onSquareClick={() => handleClick(0)} />
          <Square value={currentSquares[1]} answeredCorrectly={answeredCorrectly} onSquareClick={() => handleClick(1)} />
          <Square value={currentSquares[2]} answeredCorrectly={answeredCorrectly} onSquareClick={() => handleClick(2)} />
        </div>
        <div className="board-row">
          <Square value={currentSquares[3]} answeredCorrectly={answeredCorrectly} onSquareClick={() => handleClick(3)} />
          <Square value={currentSquares[4]} answeredCorrectly={answeredCorrectly} onSquareClick={() => handleClick(4)} />
          <Square value={currentSquares[5]} answeredCorrectly={answeredCorrectly} onSquareClick={() => handleClick(5)} />
        </div>
        <div className="board-row">
          <Square value={currentSquares[6]} answeredCorrectly={answeredCorrectly} onSquareClick={() => handleClick(6)} />
          <Square value={currentSquares[7]} answeredCorrectly={answeredCorrectly} onSquareClick={() => handleClick(7)} />
          <Square value={currentSquares[8]} answeredCorrectly={answeredCorrectly} onSquareClick={() => handleClick(8)} />
        </div>
      </div>
    );
  }

  function handlePlay(nextSquares) {
    const nextHistory = [...history.slice(0, currentMove + 1), nextSquares];
    setHistory(nextHistory);
    setCurrentMove(nextHistory.length - 1);
  }

  function jumpTo(nextMove) {
    setCurrentMove(nextMove);
  }

  function handleReset(){
    jumpTo(0);
    resetBoard();
  }
  

  return (
    <div className="game">
      <div className="game-board">
        <Board />
      </div>
        <button style={{"backgroundColor": "aqua" , 
        "borderRadius" : "7px", 
        "position": "flex",
        "marginLeft": "10px",
        "marginBottom": "300px",
        "width" : "100px",
        "height": "30px",
        "fontSize": "15px"
      }} disabled={overallWin} onClick={handleReset}>Reset</button>
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
    if (squares[a] && squares[a] === squares[b] && squares[a] === squares[c]) {
      return squares[a];
    }
  }
  return null;
}
