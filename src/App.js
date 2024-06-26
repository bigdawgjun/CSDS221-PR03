import logo from "./logo.svg";
import "./App.css";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Game from "./components/Gameboard/gameboard";
import ComputationBox from "./components/MathTester/quiz";
import ScoreBoard from "./components/ScoreBoard/score";
import React, { useState } from "react";
import { Helmet } from "react-helmet";

function App() {
  const [player1Score, setPlayer1Score] = useState(0);
  const [player2Score, setPlayer2Score] = useState(0);
  const [currentPlayer, setCurrentPlayer] = useState("X");
  const [status, setStatus] = useState(
    "Player " + currentPlayer + " Turn to Answer",
  );
  const [winner, setWinner] = useState(false);
  const [answeredCorrectly, setAnsweredCorrectly] = useState(false);
  const [draw, setDraw] = useState(false);
  const [overallWin, setOverallWin] = useState(false);

  function handleAnswer(isCorrect) {
    setAnsweredCorrectly(isCorrect);
    if (!isCorrect) {
      if (currentPlayer == "X") {
        setPlayer1Score(player1Score - 1);
      } else {
        setPlayer2Score(player2Score - 1);
      }
      setCurrentPlayer(currentPlayer === "X" ? "O" : "X");
      setStatus(
        "Player " + (currentPlayer === "X" ? "O" : "X") + " Turn to Answer",
      );
    } else {
      setStatus("Player " + currentPlayer + " Pick a Tile");
    }
  }

  function handleTilePicked() {
    setCurrentPlayer(currentPlayer === "X" ? "O" : "X");
    setStatus(
      "Player " + (currentPlayer === "X" ? "O" : "X") + " Turn to Answer",
    );
    setAnsweredCorrectly(false);
  }

  function handleWinner() {
    setStatus("Round Winner: " + currentPlayer);
    setWinner(true);
    if (currentPlayer === "X") {
      setPlayer1Score(player1Score + 3);
    } else {
      setPlayer2Score(player2Score + 3);
    }
    const new1Score = player1Score + 3;
    const new2Score = player2Score + 3;
    if (new1Score >= 10 || new2Score >= 10) {
      setStatus("Overall Winner!!! Player " + currentPlayer);
      setOverallWin(true);
    }
  }

  function resetBoard() {
    setWinner(false);
    setDraw(false);
    setCurrentPlayer("X");
    setStatus("Player X Turn to Answer");
  }

  function handleDraw() {
    setDraw(true);
    setStatus("DRAW!");
  }

  return (
    <div className="App">
      <div>
        <h1>
          How to Play: Welcome to Mathtactoe. You will battle against your
          opponent in a series of rapidfire 2-digit math computations!
        </h1>
        <br />
      </div>
      <div>
        <h2>
          Rules: Regular tic-tac-toe rules; 3 in a row to win! Now if you answer
          incorrectly or run out of time, the turn will be skipped and a point
          will be deducted.
          <br />
          If you win a round, you get 3 points. First to 10 wins all!
        </h2>
        <br />
        <div>
          <h3>Time given is random---No calculator allowed!</h3>
        </div>
        <div>
          <h4>
            Remember: This is rapidfire. The moment your opponent answers
            incorrectly, you are up next!
            <br />
            Good Luck!
          </h4>
        </div>
      </div>
      <Helmet>
        <style>{"body {background-color : #e6fffa}"}</style>
      </Helmet>
      <Game
        answeredCorrectly={answeredCorrectly}
        currentPlayer={currentPlayer}
        handleTilePicked={handleTilePicked}
        handleWinner={handleWinner}
        status={status}
        resetBoard={resetBoard}
        handleDraw={handleDraw}
        overallWin={overallWin}
      />
      <ScoreBoard player1Score={player1Score} player2Score={player2Score} />
      <ComputationBox
        handleAnswer={handleAnswer}
        answeredCorrectly={answeredCorrectly}
        winner={winner}
        draw={draw}
        overallWin={overallWin}
      />
    </div>
  );
}

export default App;
