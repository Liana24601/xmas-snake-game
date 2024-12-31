const canvas = document.getElementById("gameCanvas");
const ctx = canvas.getContext("2d");

canvas.width = 400;
canvas.height = 400;

let snake = [{ x: 200, y: 200 }];
let direction = { x: 20, y: 0 };
let food = { x: 100, y: 100 };
let score = 0;

let gameStarted = false;
let gameInterval;

const startGameLoop = () => {
  gameInterval = setInterval(gameLoop, 100);
};

const stopGameLoop = () => {
  clearInterval(gameInterval); 
};

const createSnowflake = () => {
  const snowflake = document.createElement("div");
  snowflake.classList.add("snowflake");
  snowflake.style.left = Math.random() * window.innerWidth + "px";
  snowflake.style.animationDuration = Math.random() * 3 + 2 + "s";
  snowflake.innerHTML = "❄️";
  document.body.appendChild(snowflake);

  setTimeout(() => snowflake.remove(), 5000);
};

setInterval(createSnowflake, 200);

const drawSnake = () => {
  ctx.font = "20px Arial"; 
  ctx.textAlign = "center";
  ctx.textBaseline = "middle";
  snake.forEach(segment => {
    ctx.fillText("🎄", segment.x + 10, segment.y + 10);
  });
};

const drawFood = () => {
  ctx.font = "20px Arial";
  ctx.textAlign = "center";
  ctx.textBaseline = "middle";
  ctx.fillText("🎅", food.x + 10, food.y + 10); 
};

const updateSnake = () => {
  const head = { x: snake[0].x + direction.x, y: snake[0].y + direction.y };
  snake.unshift(head);

  if (head.x === food.x && head.y === food.y) {
    score++;
    food = {
      x: Math.floor(Math.random() * (canvas.width - 40) / 20) * 20 + 20,
      y: Math.floor(Math.random() * (canvas.height - 40) / 20) * 20 + 20,
    };
  } else {
    snake.pop();
  }

  if (
    head.x < 0 || head.x >= canvas.width ||
    head.y < 0 || head.y >= canvas.height ||
    snake.slice(1).some(segment => segment.x === head.x && segment.y === head.y)
  ) {
    alert("Game Over! Your score: " + score);
    stopGameLoop(); 
    gameStarted = false; 
    snake = [{ x: 200, y: 200 }];
    direction = { x: 20, y: 0 };
    score = 0;
  }
};

const gameLoop = () => {
  ctx.clearRect(0, 0, canvas.width, canvas.height);
  drawSnake();
  drawFood();
  updateSnake();
};

document.addEventListener("keydown", (e) => {
  const key = e.key;

  if (["ArrowUp", "ArrowDown", "ArrowLeft", "ArrowRight"].includes(key)) {
    if (!gameStarted) {
      gameStarted = true; 
      startGameLoop(); 
    }

    if (key === "ArrowUp" && direction.y === 0) {
      direction = { x: 0, y: -20 };
    } else if (key === "ArrowDown" && direction.y === 0) {
      direction = { x: 0, y: 20 };
    } else if (key === "ArrowLeft" && direction.x === 0) {
      direction = { x: -20, y: 0 };
    } else if (key === "ArrowRight" && direction.x === 0) {
      direction = { x: 20, y: 0 };
    }
  }
});

