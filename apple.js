import Snake from "./snake.js"

class Apple {
  #ctx
  #gridSize
  #boardWidth
  #boardHeight
  /** 
   * @type {Snake} 
   */
  #snake
  #image
  #position

  constructor(canvas, gridSize, snake, imagePath = 'apple.png') {
    this.#ctx = canvas.getContext('2d');
    this.#gridSize = gridSize;
    this.#boardWidth = canvas.width / gridSize;
    this.#boardHeight = canvas.height / gridSize;
    this.#snake = snake;
    this.chooseRandomPosition();
    this.#loadImage(imagePath);
  }

  #loadImage(imagePath) {
    this.#image = new Image();
    this.#image.src = imagePath;
    this.#image.onload = () => {
      this.draw();
    };
  }

  draw() {    
    this.#ctx.drawImage(this.#image, this.#position.x * this.#gridSize, this.#position.y * this.#gridSize, 
      this.#gridSize, this.#gridSize);
  }
  
  chooseRandomPosition() {
    let x = this.#getRandomInt(this.#boardWidth);
    let y = this.#getRandomInt(this.#boardHeight);

    // As long as the apple's location coincides with one of the snake units, keep randomizing
    while (this.#snake.body.find(unit => unit.x === x && unit.y === y)) {
      x = this.#getRandomInt(this.#boardWidth);
      y = this.#getRandomInt(this.#boardHeight);
    }

    this.#position = { x, y };
  }

  #getRandomInt(max) {
    return Math.floor(Math.random() * max);
  }

  get position() {
    return this.#position;
  }
}

export default Apple;