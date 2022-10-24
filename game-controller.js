import Apple from "./apple.js"
import Direction from "./directions.js"
import Snake from "./snake.js"

class GameController {
  #canvas
  #ctx
  #gridSize  // size of one unit in the game in pixels
  #boardWidth
  #boardHeight
  #speed
  /** @type {Snake} */
  #snake
  /** @type {Apple} */
  #apple
  #timer
  #score

  static keysToDirections = new Map([
    ['ArrowRight', Direction.RIGHT],
    ['ArrowLeft', Direction.LEFT],
    ['ArrowUp', Direction.UP],
    ['ArrowDown', Direction.DOWN]
  ]);

  constructor(canvas, gridSize = 15, speed = 100) {
    this.#canvas = canvas;
    this.#ctx = canvas.getContext('2d');
    this.#gridSize = gridSize;
    this.#boardWidth = canvas.width / gridSize;
    this.#boardHeight = canvas.height / gridSize;
    this.#speed = speed;
  }

  startGame() {
    this.#score = 0;
    this.#snake = new Snake(this.#canvas, this.#gridSize);
    this.#snake.draw();

    this.#apple = new Apple(this.#canvas, this.#gridSize, this.#snake);

    this.#handleKeyboardEvents();

    this.#timer = setInterval(() => {
      this.#runGame();
    }, this.#speed);
  }

  #runGame() {
    this.#ctx.clearRect(0, 0, this.#canvas.width, this.#canvas.height);

    const result = this.#snake.move(this.#apple);
    switch (result) {
      case Snake.MoveResult.Invalid:
        this.#finishGame();
        return;
      case Snake.MoveResult.AppleEaten:
        this.#apple.chooseRandomPosition();
        this.#score++;
        document.getElementById("score").textContent = this.#score;
        break;
    }
    this.#snake.draw();
    this.#apple.draw();
  }

  #handleKeyboardEvents() {
    document.addEventListener('keydown', e => {
      if (GameController.keysToDirections.has(e.key)) {
        const direction = GameController.keysToDirections.get(e.key);
        this.#snake.changeDirection(direction);
      }
    });
  }

  #finishGame() {
    clearInterval(this.#timer);
    alert(`Game over. Your score was ${this.#score}`);
  }
  get finishGame() {
    return this.#finishGame();
  }
  pauseGame() {
    clearInterval(this.#timer);

  }
  resumeGame() {
    this.#timer = setInterval(() => {
      this.#runGame();
    }, this.#speed);
  }
}

export default GameController;