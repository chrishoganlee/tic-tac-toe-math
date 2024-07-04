/**
 * Tic Tac Toe Math Game
 * 
 * This game combines the classic Tic Tac Toe with elementary math problems.
 * Players must solve a math question before making a move.
 * 
 * @author Chris Hogan
 * @date 2024-07-04
 * @lastModified 2024-07-04
 * @version 1.2.0
 * 
 * Coding assistance provided by Claude 3.5 AI
 */

import React, { useState, useEffect, useRef } from 'react';
import TicTacToeMath from './TicTacToeMath';
import './Game.css';
import backgroundImage from './background.jfif';

function Game() {
  const [game, setGame] = useState(new TicTacToeMath());
  const [board, setBoard] = useState(game.board);
  const [currentPlayer, setCurrentPlayer] = useState(game.currentPlayer);
  const [mathQuestion, setMathQuestion] = useState(game.generateMathQuestion());
  const [answer, setAnswer] = useState('');
  const [message, setMessage] = useState('');
  const [timeLeft, setTimeLeft] = useState(10);
  const [scores, setScores] = useState({ X: 0, O: 0 });
  const [idleRotations, setIdleRotations] = useState(0);
  const [showIdlePopup, setShowIdlePopup] = useState(false);
  const timerRef = useRef(null);
  const idleTimerRef = useRef(null);

  /**
   * Effect hook to start timer and idle detection
   */
  useEffect(() => {
    startTimer();
    startIdleTimer();
    return () => {
      clearInterval(timerRef.current);
      clearTimeout(idleTimerRef.current);
    };
  }, [currentPlayer, mathQuestion]);

  /**
   * Starts the turn timer
   */
  const startTimer = () => {
    setTimeLeft(10);
    if (timerRef.current) clearInterval(timerRef.current);
    timerRef.current = setInterval(() => {
      setTimeLeft((time) => {
        if (time === 0) {
          clearInterval(timerRef.current);
          switchPlayer();
          return 10;
        }
        return time - 1;
      });
    }, 1000);
  };

  /**
   * Starts the idle detection timer
   */
  const startIdleTimer = () => {
    clearTimeout(idleTimerRef.current);
    idleTimerRef.current = setTimeout(() => {
      setIdleRotations(prev => prev + 1);
      if (idleRotations >= 2) {
        setShowIdlePopup(true);
        setTimeout(() => {
          if (showIdlePopup) {
            closeGame();
          }
        }, 120000);  // 120 seconds
      }
    }, 30000);  // 30 seconds for each player's turn
  };

  /**
   * Resets the idle timer
   */
  const resetIdleTimer = () => {
    setIdleRotations(0);
    startIdleTimer();
  };

  /**
   * Switches to the next player
   */
  const switchPlayer = () => {
    const nextPlayer = currentPlayer === 'X' ? 'O' : 'X';
    setCurrentPlayer(nextPlayer);
    setMathQuestion(game.generateMathQuestion());
    setAnswer('');
    setMessage(`${nextPlayer}'s turn.`);
  };

  /**
   * Handles cell click event
   * @param {number} index - The index of the clicked cell
   */
  const handleCellClick = (index) => {
    if (game.board[index] === null) {
      if (parseInt(answer) === mathQuestion.answer) {
        if (game.makeMove(index)) {
          setBoard([...game.board]);
          clearInterval(timerRef.current);
          resetIdleTimer();
          const winner = game.checkWinner();
          if (winner) {
            if (winner !== 'tie') {
              setScores(prevScores => ({
                ...prevScores,
                [winner]: prevScores[winner] + 1
              }));
            }
            setMessage(winner === 'tie' ? "It's a tie!" : `Player ${winner} wins!`);
            setTimeout(resetBoard, 3000);  // Reset board after 3 seconds
          } else {
            switchPlayer();
          }
        }
      } else {
        setMessage('Incorrect answer. Try again!');
      }
    }
  };

  /**
   * Handles answer input change
   * @param {Event} e - The input change event
   */
  const handleAnswerChange = (e) => {
    setAnswer(e.target.value);
  };

  /**
   * Handles answer submission
   * @param {Event} e - The form submission event
   */
  const handleAnswerSubmit = (e) => {
    e.preventDefault();
    if (parseInt(answer) === mathQuestion.answer) {
      clearInterval(timerRef.current);
      setMessage('Correct! Make your move.');
      resetIdleTimer();
    } else {
      setMessage('Incorrect answer. Try again!');
    }
  };

  /**
   * Resets the game board
   */
  const resetBoard = () => {
    setGame(new TicTacToeMath());
    setBoard(Array(9).fill(null));
    setCurrentPlayer('X');
    setMathQuestion(game.generateMathQuestion());
    setAnswer('');
    setMessage('');
    setTimeLeft(10);
  };

  /**
   * Resets the entire game including scores
   */
  const resetGame = () => {
    resetBoard();
    setScores({ X: 0, O: 0 });
  };

  /**
   * Closes the game due to inactivity
   */
  const closeGame = () => {
    resetGame();
    setMessage('Game closed due to inactivity. Start a new game!');
  };

  /**
   * Handles response to idle popup
   * @param {string} response - The user's response ('yes' or 'no')
   */
  const handleIdleResponse = (response) => {
    setShowIdlePopup(false);
    if (response === 'yes') {
      resetIdleTimer();
    } else {
      closeGame();
    }
  };

  return (
    <div className="game-container" style={{backgroundImage: `url(${backgroundImage})`}}>
      <div className="scoreboard">
        <h2>Scoreboard</h2>
        <div>Player X: {scores.X}</div>
        <div>Player O: {scores.O}</div>
      </div>
      <div className="game">
        <h1>Tic Tac Toe Math</h1>
        <div className="game-info">
          <div>Current Player: {currentPlayer}</div>
          <div>Time Left: {timeLeft} seconds</div>
        </div>
        <div className="math-question">
          <p>{mathQuestion.question}</p>
          <form onSubmit={handleAnswerSubmit}>
            <input
              type="number"
              value={answer}
              onChange={handleAnswerChange}
              placeholder="Enter your answer"
            />
            <button type="submit">Submit</button>
          </form>
        </div>
        <div className="game-board">
          {board.map((cell, index) => (
            <button 
              key={index} 
              className={`cell ${cell}`} 
              onClick={() => handleCellClick(index)}
            >
              {cell}
            </button>
          ))}
        </div>
        <div className="message">{message}</div>
        <button className="reset-button" onClick={resetGame}>Reset Game</button>
      </div>
      {showIdlePopup && (
        <div className="idle-popup">
          <p>Are you still playing?</p>
          <button onClick={() => handleIdleResponse('yes')}>Yes</button>
          <button onClick={() => handleIdleResponse('no')}>No</button>
        </div>
      )}
    </div>
  );
}

export default Game;