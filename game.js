const c = document.getElementById('mainWindow');
const ctx = c.getContext('2d');

// Grid generation
const maxX = 800;
const minX = 0;
const maxY = 600;
const minY = 0;
const gridMaxY = 24;
const gridMaxX = 32;


function drawGrid() {
  // Grid line color
  
  ctx.fillStyle="rgba(0,0,0)"
  
  // All vertical lines
  
  for (let i = 25; i < maxX; i+=25) {
    ctx.fillRect(i, 0, 1, 600)
  }
  
  // All horiziontal lines
  
  for (let i = 25; i < maxY; i+=25) {
    ctx.fillRect(0, i, 800, 1)
  }
}

// Snake generation
const snakeSize = 25;
let xPos = 400;
let yPos = 300;
let isScriptRunning = false;

function drawSnake() {
  ctx.fillStyle="rgba(255,0,0)"
	ctx.fillRect(xPos, yPos, snakeSize, snakeSize)
}

// Initial draw
drawSnake();
drawGrid();

function moveSnakeX(newX, i) {
  setTimeout(() => {
      xPos+=newX;
      drawSnake();
      ctx.clearRect(xPos-newX,yPos,snakeSize,snakeSize);
      drawGrid();
  }, i * 3)
}

function moveSnakeY(newY, i) {
  setTimeout(() => {
    yPos+=newY;
    drawSnake();
    ctx.clearRect(xPos,yPos-newY,snakeSize,snakeSize);
    drawGrid();
  }, i * 3)
}

document.addEventListener('keydown', (key) => {
  // Arrow key up input
	if (key.keyCode == 38 && isScriptRunning == false) {
    for (let i = yPos; i > 0; i-=25) {
      moveSnakeY(-snakeSize, i)
    }
    
  // Arrow key down input
  } else if (key.keyCode == 40) {
    for (let i = 0; i < maxY-yPos-25; i+=25) {
      moveSnakeY(snakeSize, i)
    }
  // Arrow key left input
  } else if (key.keyCode == 37) {
    for (let i = xPos; i > 0; i-=25) {
      moveSnakeX(-snakeSize, i)
    }
  // Arrow key right input
  } else if (key.keyCode == 39) {
    for (let i = 0; i < maxX-xPos-25; i+=25) {
      moveSnakeX(snakeSize, i)
    }
    
  }
})

