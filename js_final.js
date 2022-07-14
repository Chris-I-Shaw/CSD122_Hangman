/*
Chris Shaw
Javascript Final Project
12/4/19
*/

/*
Hangman Game
project selects a random word from a list and 
allows the user to play a functioning game of 
hangman with win and lose criteria
*/

//list of words to be used
var solutions = ["lion", "anaconda", "alligator", "wolf",
    "goat", "chimpanzee", "crocodile",
    "poodle", "hippopotamus", "kangaroo", "rhinoceros",
    "bear", "zebra", "turtle", "husky"];

//sets word to be guessed to 
const wordToGuess = setWord();


//Global variables
var lives = 6;
var guessedLetters = [];
var revealedLetters = [];
var gameOver = false;
var guess;
var message;


/**
 * Initializes the guess word to a random index in the solutions array
 * randomNumber - gets a random number within the index of the solution aray
 * returns the word from the selected index
 */
function setWord() {
    let randomNumber = Math.floor(Math.random() * (solutions.length - 1));
    return solutions[randomNumber];

}

/**
 * Inititalizes the revealed letters to be underscores
 */
function setRevealedLetters() {
    for (var i = 0; i < wordToGuess.length; i++) {
        revealedLetters[i] = "_";
    }
}

/**
 * Switch statement to print board based on the amount of lives left
 * @param {*} lives uses lives remaining as the case
 */
function drawGame(lives) {
    switch (lives) {
        case 6:
            console.log("  ____   ");
            console.log(" |    |  ");
            console.log(" |       ");
            console.log(" |       ");
            console.log(" |       ");
            console.log(" |       ");
            console.log("_|___    ");

            break;
        case 5:
            console.log("  ____   ");
            console.log(" |    |  ");
            console.log(" |    O  ");
            console.log(" |       ");
            console.log(" |       ");
            console.log(" |       ");
            console.log("_|___    ");
            break;
        case 4:
            console.log("  ____   ");
            console.log(" |    |  ");
            console.log(" |    O  ");
            console.log(" |  --   ");
            console.log(" |       ");
            console.log(" |       ");
            console.log("_|___    ");
            break;
        case 3:
            console.log("  ____   ");
            console.log(" |    |  ");
            console.log(" |    O  ");
            console.log(" |  -- --");
            console.log(" |    |  ");
            console.log(" |       ");
            console.log("_|___    ");
            break;
        case 2:
            console.log("  ____   ");
            console.log(" |    |  ");
            console.log(" |    O  ");
            console.log(" |  -- --");
            console.log(" |    |  ");
            console.log(" |   /   ");
            console.log("_|___    ");
            break;
        case 1:
            console.log("  ____   ");
            console.log(" |    |  ");
            console.log(" |    O  ");
            console.log(" |  -- --");
            console.log(" |    |  ");
            console.log(" |   / \\ ");
            console.log("_|___    ");

    }
}

/**
 * Prints the revealed letters and the correct letters
 */
function drawWord() {
    console.log(revealedLetters.toString());
    console.log("Your guessed letters are: " + guessedLetters);
}

/**
 * Gathers user input and loops verification until user picks a letter they have not guessed
 * updates the guessed letters if new letter is chosen
 * calls checkGuess function
 */
function getGuess() {

    var check = false;

    while (!check) {

        var tempGuess = window.prompt("Enter a letter");

        if (!checkGuess(tempGuess)) {

            guess = tempGuess;
            check = true;
            guessedLetters.push(guess);
            continue;

        } else console.log("Enter a valid letter");
    }
}

/**
 * Tests whether or not a player already guessed a specific letter
 * @param {*} tempGuess  passed from getGuess to verify it is a new letter
 * returns a boolean of the if statement
 */
function checkGuess(tempGuess) {

    var temp = tempGuess;

    for (var i = 0; i < guessedLetters.length; i++) {

        if (temp === guessedLetters[i]) return true;
    }
    return false;

}

/**
 * Checks if the guess is in the word
 * Calls updateRevealedLetters if correct
 * Uses a test counter to subtract lives if none match
 */
function letterExists() {
    var count = 0;
    test = Array.from(wordToGuess);
    for (var i = 0; i < wordToGuess.length; i++) {
        if (guess === test[i]) {
            updateRevealedLetter(guess);
            count++;

        }
    }
    if (count === 0) lives--;
}

/**
 * Updates correct guesses to their corresponding index in the revealed letters array
 */
function updateRevealedLetter() {
    test = Array.from(wordToGuess);
    for (var i = 0; i < wordToGuess.length; i++) {
        if (test[i] === guess) {
            revealedLetters[i] = guess;
        }
    }

}

/**
 * Checks if the user has inputted all correct letters or ran out of lives
 * Uses counters to see if all letters compared in the arrays match
 * uses the counter to apply the correct message at end of game
 */
function checkWinCondition() {
    var test = Array.from(wordToGuess);
    var count = 0;
    var totalCount = wordToGuess.length;

    if (lives === 1) {
        message = ("Out of lives. The word was " + wordToGuess);
        gameOver = true;

    }

    for (var i = 0; i < wordToGuess.length; i++) {
        if (test[i] === revealedLetters[i]) {
            count++;
        }
    }
    
    if (count === totalCount) {
        message = ("Congratulations you won");
        gameOver = true;
    }

}

//Syntax for game

//Initializes the revealed letters to underscores and draws both 
//the first game board and the first revealed letters array
//acts as first fencepost of game
setRevealedLetters();
drawGame(lives);
drawWord();

//While loop that repeats the steps of the game until end criteria is met
while (!gameOver) {

    getGuess();
    letterExists();
    checkWinCondition();
    drawGame(lives);
    drawWord();
}

//Prints out whether the game was won or lost
console.log(message);
