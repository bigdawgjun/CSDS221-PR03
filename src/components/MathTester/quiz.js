import React, { useState, useEffect } from "react";
import "./quiz.css";

const ComputationBox = ({
  handleAnswer,
  answeredCorrectly,
  winner,
  draw,
  overallWin,
}) => {
  const [num1, setNum1] = useState(Math.floor(Math.random() * 90) + 10);
  const [num2, setNum2] = useState(Math.floor(Math.random() * 90) + 10);
  const [operator, setOperator] = useState(
    ["+", "-", "*"][Math.floor(Math.random() * 3)],
  );
  const [userAnswer, setUserAnswer] = useState("");
  const [message, setMessage] = useState("");
  const [countdown, setCountdown] = useState(-1);

  useEffect(() => {
    if (countdown === 0) {
      handleAnswer(false);
      resetQuiz();
    }
  }, [countdown]);

  function resetQuiz() {
    const randomCountdown = Math.floor(Math.random() * 11) + 5; // Random countdown between 5 and 15 seconds
    setNum1(Math.floor(Math.random() * 90) + 10);
    setNum2(Math.floor(Math.random() * 90) + 10);
    setOperator(["+", "-", "*"][Math.floor(Math.random() * 3)]);
    setMessage("");
    setUserAnswer("");
    setCountdown(randomCountdown);
  }

  useEffect(() => {
    if (overallWin) {
      setMessage("Please refresh the page for a new game!");
      return;
    } else if (winner || draw) {
      setMessage("Please Reset The Board");
      return;
    }

    if (!answeredCorrectly) {
      resetQuiz();
    }

    const timer = setInterval(() => {
      setCountdown((prevCountdown) => {
        if (prevCountdown > 0) {
          return prevCountdown - 1;
        } else {
          clearInterval(timer);
          setMessage("Time's up!");
          return 0;
        }
      });
    }, 1000);

    return () => {
      clearInterval(timer);
    };
  }, [draw, winner, answeredCorrectly]);

  const handleAnswerChange = (event) => {
    setUserAnswer(event.target.value);
  };

  const checkAnswer = () => {
    if (countdown === 0) {
      setMessage("Time's up! Try again.");
      handleAnswer(false);
    }

    const correctAnswer = eval(`${num1} ${operator} ${num2}`);

    if (parseInt(userAnswer) === correctAnswer) {
      handleAnswer(true);
      setCountdown(9999999);
    } else {
      handleAnswer(false);
      resetQuiz();
    }
  };

  return (
    <div className="quizbox">
      <div>
        {!winner && !draw && (
          <div>
            <span>{num1} </span>
            <span>{operator} </span>
            <span>{num2} </span>
            <span> = </span>
            <input
              style={{ borderRadius: "7px", width: "200px", height: "30px" }}
              type="number"
              value={userAnswer}
              onChange={handleAnswerChange}
            />
            <button
              style={{
                backgroundColor: "#14d411",
                borderRadius: "7px",
                width: "200px",
                height: "30px",
              }}
              onClick={checkAnswer}
              disabled={countdown === 0}
            >
              Check Answer
            </button>
          </div>
        )}
      </div>
      <div>{message}</div>
      {!winner && !draw && (
        <div
          style={{
            color: countdown <= 5 ? "red" : "inherit",
            animation: countdown <= 5 ? "blinking 1s infinite" : "none",
          }}
        >
          Time remaining: {countdown} seconds
        </div>
      )}
      <style>
        {`
          @keyframes blinking {
            0% {
              opacity: 1;
            }
            50% {
              opacity: 0;
            }
            100% {
              opacity: 1;
            }
          }
        `}
      </style>
    </div>
  );
};

export default ComputationBox;
