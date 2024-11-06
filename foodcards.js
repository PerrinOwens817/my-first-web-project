var errors = 0;
var foodCardList = [
    "tomato",
    "cucumber",
    "carrot",
    "pepper",
    "corn",
    "broccoli",
    "cabbage",
    "pumpkin",
    "avocado",
    "mushroom",
];

var foodCardSet;
var board = [];
var rows = 4;
var columns = 5;

var foodCard1Selected;
var foodCard2Selected;

// Audio elements for correct and incorrect matches
var correctSound = new Audio("correct-156911.mp3");
var wrongSound = new Audio("wrong-buzzer-6268.mp3");

window.onload = function() {
    setupRestartButton();
    shuffleFoodCards();
    startGame();
}

function setupRestartButton() {
    const restartButton = document.getElementById("restartButton");
    restartButton.addEventListener("click", function() {
        resetGame();
    });
}

function resetGame() {
    // Reset game variables
    errors = 0;
    document.getElementById("errors").innerText = errors;
    foodCard1Selected = null;
    foodCard2Selected = null;
    board = [];

    // Clear the board
    document.getElementById("board").innerHTML = "";

    // Shuffle and restart the game
    shuffleFoodCards();
    startGame();
}

function shuffleFoodCards() {
    foodCardSet = foodCardList.concat(foodCardList); // Duplicate the list
    for (let i = 0; i < foodCardSet.length; i++) {
        let j = Math.floor(Math.random() * foodCardSet.length);
        [foodCardSet[i], foodCardSet[j]] = [foodCardSet[j], foodCardSet[i]]; // Swap elements
    }
}

function startGame() {
    for (let r = 0; r < rows; r++) {
        let row = [];
        for (let c = 0; c < columns; c++) {
            let foodCardImg = foodCardSet.pop();
            row.push(foodCardImg);

            let card = document.createElement("img");
            card.id = r.toString() + "-" + c.toString();
            card.src = "back.jpg";
            card.classList.add("card");
            card.dataset.img = foodCardImg; // Store the image name for checking matches
            card.addEventListener("click", selectCard);
            document.getElementById("board").append(card);
        }
        board.push(row);
    }
}

function selectCard() {
    if (this.src.includes("back")) {
        if (!foodCard1Selected) {
            foodCard1Selected = this;
            foodCard1Selected.src = foodCard1Selected.dataset.img + ".jpg";
        }
        else if (!foodCard2Selected && this !== foodCard1Selected) {
            foodCard2Selected = this;
            foodCard2Selected.src = foodCard2Selected.dataset.img + ".jpg";
            setTimeout(checkMatch, 1000);
        }
    }
}

function checkMatch() {
    if (foodCard1Selected.dataset.img === foodCard2Selected.dataset.img) {
        // Correct match
        correctSound.play();
        foodCard1Selected = null;
        foodCard2Selected = null;
    } else {
        // Incorrect match
        wrongSound.play();
        foodCard1Selected.src = "back.jpg";
        foodCard2Selected.src = "back.jpg";
        errors += 1;
        document.getElementById("errors").innerText = errors;
        foodCard1Selected = null;
        foodCard2Selected = null;
    }
}
