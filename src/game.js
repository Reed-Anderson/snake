// game.js

import Snake from './snake';
import Food from './food'

/** @class Game
  * Represents a snake game
  */
export default class Game {
  constructor() {
    this.snake = new Snake(50, 50, 16);
    this.food = [];
    this.over = false;
    this.input = {
      direction: 'right'
    }
    // Create the back buffer canvas
    this.backBufferCanvas = document.createElement('canvas');
    this.backBufferCanvas.width = 100;
    this.backBufferCanvas.height = 100;
    this.backBufferContext = this.backBufferCanvas.getContext('2d');
    // Create the screen buffer canvas
    this.screenBufferCanvas = document.createElement('canvas');
    this.screenBufferCanvas.width = 100;
    this.screenBufferCanvas.height = 100;
    document.body.appendChild(this.screenBufferCanvas);
    this.screenBufferContext = this.screenBufferCanvas.getContext('2d');
    // Create HTML UI Elements
    var message = document.createElement('div');
    message.id = "message";
    message.innerHTML = "";
    document.body.appendChild(message);
    // Bind class functions
    this.gameOver = this.gameOver.bind(this);
    this.update = this.update.bind(this);
    this.render = this.render.bind(this);
    this.loop = this.loop.bind(this);
    this.handleKeyDown = this.handleKeyDown.bind(this);
    window.onkeydown = this.handleKeyDown;
    // Start the game interval
    this.interval = setInterval(this.loop, 300);
  }
  /**
   * @method inputPoll
   * Poll the input
   */

  /**
   * @function gameOver
   */
  gameOver() {
    var message = document.getElementById("message");
    message.innerHTML = "Game Over";
    this.over = true;
  }

  /**
   * handleKeyDown
   * register when a key is pressed and change
   * our input object
   */
  handleKeyDown(event) {
    event.preventDefault();
    switch(event.key){
      case 'w':
      case 'ArrowUp':
        this.input.direction = 'up';
        break;
      case 'a':
      case 'ArrowLeft':
        this.input.direction = 'left';
        break;
      case 's':
      case 'ArrowDown':
        this.input.direction = 'down';
        break;
      case 'd':
      case 'ArrowRight':
        this.input.direction = 'right';
        break;
    }
  }

   /**
    * @method update
    * updates the game
    */
  update() {

    if (!this.over) {
      var position = this.snake.getPosition();
      console.log(position)
      if (position.x < 0 || position.x >= 100 
        ||position.y < 0 || position.y >= 100) {
          this.over = true;
          return this.gameOver();;
      }
        
      this.food.push(new Food(Math.floor(Math.random() * 100), Math.floor(Math.random() * 100)))

      this.food.forEach((food) => {
        food.update();
      })
      this.over = this.snake.update(this.input, this.gameOver);
    }
  }

  /**
   * @method update
   */
  loop() {
    this.update();
    this.render();
  }
  render() {
    this.backBufferContext.fillStyle = '#ccc';
    this.backBufferContext.fillRect(0,0,100,100);
    this.food.forEach((food) => {
      food.render(this.backBufferContext);
    })
    this.snake.render(this.backBufferContext);
    this.screenBufferContext.drawImage(this.backBufferCanvas, 0, 0)
    if (this.over) {
      this.screenBufferContext.font = '5px sans-serif';
      this.screenBufferContext.fillText('Game Over', 20, 50)
    }
  }
}
