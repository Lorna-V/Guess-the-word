// GLOBAL VARIABLES -------------------------------------------------------

// The unordered list where the player’s guessed letters will appear.
const guessedLettersElement = document.querySelector(".guessed-letters");
// The button with the text “Guess!” in it.
const guessLetterButton = document.querySelector(".guess");
// The text input where the player will guess a letter.
const letterInput = document.querySelector(".letter");
// The empty paragraph where the word in progress will appear.
const wordInProgress = document.querySelector(".word-in-progress");
// The paragraph where the remaining guesses will display.
const remainingGuessesElement = document.querySelector(".remaining");
// The span inside the paragraph where the remaining guesses will display.
const remainingGuessesSpan = document.querySelector(".remaining span");
// The empty paragraph where messages will appear when the player guesses a letter.
const message = document.querySelector(".message");
// The hidden button that will appear prompting the player to play again.
const playAgainButton = document.querySelector(".play-again");

 
const word = "magnolia";// starting word to test out the game


// Function to add Placeholder symbol for Each Letter -----------------------
const placeholder = function (word) { 
    const placeholderLetters = []; 
    for (const letter of word){
        console.log(letter);
        placeholderLetters.push("●");
    }
    wordInProgress.innerText = placeholderLetters.join("");
};

placeholder(word); 

// Event Listener for the Button ------------------------------------------------
guessLetterButton.addEventListener ("click", function(e){
    e.preventDefault(); //prevent reloading behavior
    const guess = letterInput.value; //capture the value of the input
    console.log(guess); //log out the value of the input
    letterInput.value = ""; //empty the value of the input
});