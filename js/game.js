export default class Game {
  constructor() {
    this.turn = 'X';
    this.board = new Array(9).fill(null);
  }

  next_turn() {
    this.turn = this.turn == 'X' ? 'O' : 'X';
  }

  make_move(i) {
    if (!this.is_in_progress()) {
      return;
    }

    if (this.board[i]) {
      return;
    }

    this.board[i] = this.turn;

    if (!this.find_winning_combination()) this.next_turn();
  }

  find_winning_combination() {
    const find_winning_combinations = [
      [0, 1, 2],
      [3, 4, 5],
      [6, 7, 8],
      [0, 3, 6],
      [1, 4, 7],
      [2, 5, 8],
      [0, 4, 8],
      [2, 4, 6],
    ];

    for (const combination of find_winning_combinations) {
      const [a, b, c] = combination;

      if (
        this.board[a] &&
        this.board[a] == this.board[b] &&
        this.board[a] == this.board[c]
      ) {
        return combination;
      }
    }
    return null;
  }

  is_in_progress() {
    return !this.find_winning_combination() && this.board.includes(null);
  }
}
