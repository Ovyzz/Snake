const size = 25;
let score = 0;
let position = 1
let snake = [2, 1, 0];
let gridCopy  = [];
const grid = document.getElementById("grid");

generateBoard();
setInterval(updateSnake, 150);
document.addEventListener("keyup", movement)

function generateBoard() {
    grid.innerHTML = "";
    document.getElementById("score").innerHTML = "0";
    let cell = 0;
    for (let i = 0; i < size; ++i) {
        let line = grid.insertRow(i);
        for (let j = 0; j < size; ++j) {
            let element = line.insertCell(j);
            if (cell % 2 !== 0) {
                element.style.background = "#8AFF8A";
            }
            gridCopy[cell++] = element;
        }
    }
    generatesStone();
    generatesApples();
}

function movement(buttonPressed) {
    if(buttonPressed.keyCode === 37) {
        position = -1;
    } else if (buttonPressed.keyCode === 38) {
        position = -size;
    } else if (buttonPressed.keyCode === 39) {
        position = 1;
    } else if (buttonPressed.keyCode === 40) {
        position = size;
    }
}

function generatesApples() {
    let randomLine = Math.floor(Math.random() * size);
    let randomColumn = Math.floor(Math.random() * size);
    grid.rows[randomLine].cells[randomColumn].innerHTML = "🍎";
}

function generatesStone() {
    for (let i = 0; i < 5; ++i) {
        let randomLine = Math.floor(Math.random() * size);
        let randomColumn = Math.floor(Math.random() * size);
        grid.rows[randomLine].cells[randomColumn].innerHTML = "🧱";
    }
}

function updateSnake() {
    if (gridCopy[snake[0] + position].classList.contains("snake") || (gridCopy[snake[0] + position].innerHTML === "🧱") ||
        (snake[0] >= size * size)) {
        return clearInterval(0);
    }
    const queue = snake.pop();
    gridCopy[queue].classList.remove("snake");
    snake.unshift(snake[0] + position);
    if(gridCopy [snake[0]].innerText === "🍎") {
        ++score;
        document.getElementById("score").innerText = + score + "";
        gridCopy[snake[0]].innerText = "";
        gridCopy[queue].classList.add("snake");
        snake.push(queue);
        clearInterval(0);
        generatesApples();
    }
    gridCopy[snake[0]].classList.add("snake");
}