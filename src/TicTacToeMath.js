class TicTacToeMath {
    constructor() {
      this.board = Array(9).fill(null);
      this.currentPlayer = 'X';
      this.timeLimit = 10000; // 10 seconds in milliseconds
    }
  
    makeMove(index) {
      if (this.board[index] === null) {
        this.board[index] = this.currentPlayer;
        this.currentPlayer = this.currentPlayer === 'X' ? 'O' : 'X';
        return true;
      }
      return false;
    }
  
    checkWinner() {
      const winningCombos = [
        [0, 1, 2], [3, 4, 5], [6, 7, 8], // Rows
        [0, 3, 6], [1, 4, 7], [2, 5, 8], // Columns
        [0, 4, 8], [2, 4, 6]             // Diagonals
      ];
  
      for (let combo of winningCombos) {
        const [a, b, c] = combo;
        if (this.board[a] && this.board[a] === this.board[b] && this.board[a] === this.board[c]) {
          return this.board[a];
        }
      }
  
      if (this.board.every(cell => cell !== null)) {
        return 'tie';
      }
  
      return null;
    }
  
    generateMathQuestion() {
      const operations = ['+', '-', '*'];
      const operation = operations[Math.floor(Math.random() * operations.length)];
      let num1, num2, answer;
  
      switch (operation) {
        case '+':
          num1 = Math.floor(Math.random() * 20) + 1;
          num2 = Math.floor(Math.random() * 20) + 1;
          answer = num1 + num2;
          break;
        case '-':
          num1 = Math.floor(Math.random() * 20) + 1;
          num2 = Math.floor(Math.random() * num1) + 1;
          answer = num1 - num2;
          break;
        case '*':
          num1 = Math.floor(Math.random() * 10) + 1;
          num2 = Math.floor(Math.random() * 10) + 1;
          answer = num1 * num2;
          break;
      }
  
      return {
        question: `${num1} ${operation} ${num2} = ?`,
        answer: answer
      };
    }
  }
  
  export default TicTacToeMath;