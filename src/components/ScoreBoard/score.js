import React, { useState } from "react";
import "./score.css";
import Box from "@mui/material/Box";

const ScoreBoard = ({ player1Score, player2Score }) => {
  return (
    <div className="scoreboard">
      <Box
        component="section"
        sx={{
          p: 2,
          border: "1px solid grey",
          width: "200px",
          ml: "50%",
          display: "flex",
          bgcolor: "#2aebf5",
        }}
      >
        <div>
          <span>Player O Score: {player2Score}</span>
        </div>
        <div>
          <span>Player X Score: {player1Score}</span>
        </div>
      </Box>
    </div>
  );
};

export default ScoreBoard;
