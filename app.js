let score = 0;
const size = 25;
let speed = 150;
let tail = [{i: 0, j: 0}, {i: 0, j: 1}, {i: 0, j: 2}];
let indexLine = 0, indexColumn = 2;
let lineVersor = 0, columnVersor = 1;
const grid = document.getElementById("grid");

generateBoard();
setInterval(updateSnake, speed);
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
            ++cell;
        }
    }
    for (let i = 0; i < 3; ++i) {
        grid.rows[0].cells[i].classList.add("snake");
    }
    generatesStone();
    generatesApples();
    generatesApples();
}

function movement(buttonPressed) {
    if(buttonPressed.keyCode === 37) {
        lineVersor = 0;
        columnVersor = -1;
    } else if (buttonPressed.keyCode === 38) {
        lineVersor = -1;
        columnVersor = 0;
    } else if (buttonPressed.keyCode === 39) {
        lineVersor = 0;
        columnVersor = 1;
    } else if (buttonPressed.keyCode === 40) {
        lineVersor = 1;
        columnVersor = 0;
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
        if (grid.rows[randomLine].cells[randomColumn].className !== "snake") {
            grid.rows[randomLine].cells[randomColumn].innerHTML = "🧱";
        }
    }
}

function updateSnake() {
    if (checkGameOver() === 1) {
        return clearInterval(0);
    }
    grid.rows[tail[0].i].cells[tail[0].j].classList.remove("snake");
    if(grid.rows[indexLine].cells[indexColumn].innerText === "🍎") {
        ++score;
        document.getElementById("score").innerText = + score + "";
        grid.rows[indexLine].cells[indexColumn].innerText = "";
        tail.push({i: indexLine, j: indexColumn});
        grid.rows[indexLine].cells[indexColumn].classList.add("snake");
        clearInterval(0);
        generatesApples();
    }
    tail.shift();
    indexLine += lineVersor;
    indexColumn += columnVersor;
    grid.rows[indexLine].cells[indexColumn].classList.add("snake");
    tail.push({i: indexLine, j: indexColumn});
}

function checkGameOver() {
    if (grid.rows[indexLine].cells[indexColumn].innerText === "🧱" || indexLine + lineVersor === -1 ||
        indexColumn + columnVersor === -1 || indexColumn + lineVersor === size - 1 || indexLine + columnVersor === size - 1 ||
        grid.rows[indexLine + lineVersor].cells[indexColumn + columnVersor].classList.contains("snake")) {
        document.getElementById("score").innerText = "GAME OVER!";
        return 1;
    }
}