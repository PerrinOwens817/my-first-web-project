let score = 0;
let isPlaying = true;  // Track if the game is active

function generateQuestion() {
    const num1 = Math.floor(Math.random() * 10) + 1;
    const num2 = Math.floor(Math.random() * 10) + 1;
    document.querySelector('.question').textContent = `What is ${num1} + ${num2}?`;
    return num1 + num2;
}

let correctAnswer = generateQuestion();

function submitAnswer() {
    if (!isPlaying) return;

    const userAnswer = parseInt(document.querySelector('.answer-input').value);
    if (userAnswer === correctAnswer) {
        score += 10;
        playCorrectSound();
        //alert("Correct! Good job!");
    } else {
        score -= 10;
        playIncorrectSound();
        //alert("Oops! Try again.");
    }
    document.querySelector('.score-display').textContent = `Score: ${score}`;
    correctAnswer = generateQuestion();
    document.querySelector('.answer-input').value = '';
}

function startNewQuestion() {
    correctAnswer = generateQuestion();
    document.querySelector('.answer-input').value = '';
}

function endGame() {
    isPlaying = false;
    document.querySelector('.game-over-message').textContent = `Game Over! Your final score is: ${score}`;
    document.querySelector('.game-over-message').style.display = 'block';
    playEndSound();
    console.log("Game Over! Your final score is: " + score);
}

function playCorrectSound() {
    const correctSound = document.getElementById("correct-sound");
    correctSound.play();
}

function playIncorrectSound() {
    const incorrectSound = document.getElementById("incorrect-sound");
    incorrectSound.play();
}

function playEndSound() {
    const endSound = document.getElementById("end-sound");
    endSound.play();
}

function restartGame() {
    score = 0;
    isPlaying = true;
    document.querySelector('.score-display').textContent = `Score: ${score}`;
    document.querySelector('.game-over-message').style.display = 'none';
    correctAnswer = generateQuestion();
    document.querySelector('.answer-input').value = '';
    console.log("Game restarted.");
}