const c = document.getElementById("mainWindow");
const ctx = c.getContext("2d");
let score = 0;

// Main game loop

function render() {
  // Updates score

  document.getElementById("myScore").innerHTML = score;

  // Draws the snake

  drawSnake();
  drawBody();
  drawGrid();

  // Wall detection

  if (xPos > maxX - 25) {
    xPos -= 25;
  } else if (xPos < minX) {
    xPos += 25;
  } else if (yPos > maxY - 25) {
    yPos -= 25;
  } else if (yPos < minY) {
    yPos += 25;
  }

  // Snake movement

  if (snakeDirection == 0) {
    yPos -= 25;
  } else if (snakeDirection == 1) {
    yPos += 25;
  } else if (snakeDirection == 2) {
    xPos -= 25;
  } else if (snakeDirection == 3) {
    xPos += 25;
  }

  // Detects if snake eats food

  if (xPos == foodX && yPos == foodY) {
    foodX = Math.floor(Math.random() * gridMaxX) * gridSize;
    foodY = Math.floor(Math.random() * gridMaxY) * gridSize;
    drawFood();
    snakeLength++;
    score++;
  }

  // Sets the speed of game

  setTimeout(() => {
    requestAnimationFrame(render);
  }, 75);
}

requestAnimationFrame(render);

// Grid generation

const gridSize = 25;
const maxX = 700;
const minX = 0;
const maxY = 700;
const minY = 0;
const gridMaxY = maxY / 25;
const gridMaxX = maxX / 25;

function drawGrid() {
  // Grid line color

  ctx.fillStyle = "rgba(255,255,255, 0.05)";

  // All vertical lines

  for (let i = 25; i < maxX; i += 25) {
    ctx.fillRect(i, 0, 1, maxY);
  }

  // All horiziontal lines

  for (let i = 25; i < maxY; i += 25) {
    ctx.fillRect(0, i, maxX, 1);
  }
}

// Snake generation

let foodX = 100;
let foodY = 100;
let xPos = 400;
let yPos = 300;
let snakeBody = [];
let snakeLength = 3;

let snakeDirection = 0;

function drawSnake() {
  ctx.fillStyle = "rgba(255,0,0)";
  ctx.fillRect(xPos, yPos, gridSize, gridSize);
}

function drawBody() {
  snakeBody.push([xPos, yPos]);
  ctx.fillStyle = "rgba(200,0,0)";
  ctx.fillRect(xPos, yPos, gridSize, gridSize);
  if (snakeBody.length > snakeLength) {
    var itemToRemove = snakeBody.shift();
    ctx.clearRect(itemToRemove[0], itemToRemove[1], gridSize, gridSize);
  }
}

function drawFood() {
  ctx.fillStyle = "rgba(255,255,0)";
  ctx.fillRect(foodX, foodY, gridSize, gridSize);
}

drawFood();

// Keyboard input scripts

document.addEventListener("keydown", (key) => {
  // Arrow key up input
  if (key.keyCode == 38 && snakeDirection != 1) {
    snakeDirection = 0;
    // Arrow key down input
  } else if (key.keyCode == 40 && snakeDirection != 0) {
    snakeDirection = 1;
    // Arrow key left input
  } else if (key.keyCode == 37 && snakeDirection != 3) {
    snakeDirection = 2;
    // Arrow key right input
  } else if (key.keyCode == 39 && snakeDirection != 2) {
    snakeDirection = 3;
  }
});
