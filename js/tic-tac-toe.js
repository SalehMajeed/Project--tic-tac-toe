import Game from './game.js';
import GameView from './game_view.js';

let game = new Game();
let game_view = new GameView(document.getElementById('app'));

game_view.on_tile_click = function (i) {
  game.make_move(i);
  game_view.update(game);
};

game_view.on_restart_click = function () {
  game = new Game();
  game_view.update(game);
};

game_view.update(game);
