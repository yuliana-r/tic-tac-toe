const resetBtn = document.getElementById('reset');
const boxes = document.querySelectorAll('.box');

let currentPlayer = "O";

let game = ["", "", "", "", "", "", "", "", ""];

function handleBoxClick() {
    boxes.forEach(box => box.addEventListener('click', () => {
        box.textContent = currentPlayer;
        if (box.textContent == "O" ? box.style.color = '#64b0d9' : box.style.color = '#d92525');
        currentPlayer = "X";
    }))
}

function resetGame() {
    boxes.forEach(box => box.textContent = "")
}

handleBoxClick();
resetBtn.addEventListener('click', resetGame);