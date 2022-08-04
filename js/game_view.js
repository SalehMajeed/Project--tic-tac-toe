export default class GameView {
  constructor(root) {
    this.root = root;
    this.root.innerHTML = `
        <div class='header'>
            <div class='header__turn'></div>
            <div class='header__status'></div>
            <button type='button' class='header__restart'>
                <i class='material-icons'>refresh</i>
            </button>
        </div>
        <div class='board'>
            <div class='board__tile' data-index=0></div>
            <div class='board__tile' data-index=1></div>
            <div class='board__tile' data-index=2></div>
            <div class='board__tile' data-index=3></div>
            <div class='board__tile' data-index=4></div>
            <div class='board__tile' data-index=5></div>
            <div class='board__tile' data-index=6></div>
            <div class='board__tile' data-index=7></div>
            <div class='board__tile' data-index=8></div>
        </div>
      `;

    this.on_tile_click = undefined;
    this.on_restart_click = undefined;

    this.root.querySelectorAll('.board__tile').forEach((tile) => {
      tile.addEventListener('click', () => {
        if (this.on_tile_click) this.on_tile_click(tile.dataset.index);
      });
    });

    this.root
      .querySelector('.header__restart')
      .addEventListener('click', () => {
        if (this.on_restart_click) this.on_restart_click();
      });
  }

  update(game) {
    this.update_turn(game);
    this.update_status(game);
    this.update_board(game);
  }

  update_status(game) {
    this.root.querySelector(
      '.header__turn'
    ).textContent = `${game.turn}'s turn`;
  }

  update_turn(game) {
    let status = 'In Progress';

    if (game.find_winning_combination()) {
      status = `${game.turn} is the winner`;
    } else if (!game.is_in_progress()) {
      status = "It's a tie";
    }

    this.root.querySelector('.header__status').textContent = status;
  }

  update_board(game) {
    const winning_combination = game.find_winning_combination();

    for (let i = 0; i < game.board.length; i++) {
      const tile = this.root.querySelector(`.board__tile[data-index="${i}"]`);

      tile.classList.remove('board__tile--winner');
      tile.textContent = game.board[i];

      if (winning_combination && winning_combination.includes(i)) {
        tile.classList.add('board__tile--winner');
      }
    }
  }
}
