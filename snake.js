import Direction from "./directions.js"
import Apple from "./apple.js"

class Snake {
  /** @type { HTMLCanvasElement } */
  #ctx
  #gridSize
  #boardWidth
  #boardHeight
  #initialSize
  #startPos  
  #color
  /** @type {Array} */
  #body
  #currDirection

  static directionDeltas = new Map([
    [Direction.RIGHT, [1, 0]],
    [Direction.DOWN, [0, 1]],
    [Direction.LEFT, [-1, 0]],
    [Direction.UP, [0, -1]]
  ]);

  static MoveResult = {
    Invalid: -1,
    Valid: 0,
    AppleEaten: 1
  }

  constructor(canvas, 
    gridSize, 
    initialSize = 5, 
    startPos = {x: 5, y: 5}, 
    initialDirection = Direction.RIGHT,
    color = 'blue'
  ) {   
    this.#ctx = canvas.getContext('2d');
    this.#gridSize = gridSize;
    this.#boardWidth = canvas.width / gridSize;
    this.#boardHeight = canvas.height / gridSize;
    this.#initialSize = initialSize;
    this.#startPos = startPos;
    this.#color = color;

    this.#createBody();
    this.#currDirection = initialDirection;
  }

  #createBody() {
    this.#body = [];
    for (let i = 0; i < this.#initialSize; i++) {
      this.#body.push({ x: this.#startPos.x + i, y: this.#startPos.y });
    }
  }

  draw() {    
    this.#ctx.fillStyle = this.#color;
    for (const unit of this.#body) {
      this.#ctx.fillRect(unit.x * this.#gridSize, unit.y * this.#gridSize, 
        this.#gridSize, this.#gridSize);
    }
  }

  /**
   * 
   * @param {Apple} apple 
   * @returns 
   */
  move(apple) {
    const currHead = this.#body[this.#body.length - 1];
    const delta = Snake.directionDeltas.get(this.#currDirection);
    const newHead = { x: currHead.x + delta[0], y: currHead.y + delta[1] };

    if (!this.#isValidPos(newHead)) {
      return Snake.MoveResult.Invalid;
    }

    this.#body.push(newHead);

    if (newHead.x === apple.position.x && newHead.y === apple.position.y) {
      return Snake.MoveResult.AppleEaten;
    }

    this.#body.shift();
    return Snake.MoveResult.Valid;
  }

  #isValidPos(pos) {
    // Check collision with the walls
    if (pos.x < 0 || pos.x >= this.#boardWidth || pos.y < 0 || pos.y >= this.#boardHeight) { 
      return false;
    }

    // Check collision with itself
    if (this.#body.find(unit => unit.x === pos.x && unit.y === pos.y)) {
      return false;
    }
    return true;
  }

  changeDirection(newDirection) {
    this.#currDirection = newDirection;
  }

  get body() {
    return this.#body;
  }
}

export default Snake;