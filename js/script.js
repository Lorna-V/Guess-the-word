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
 
let word = "magnolia"; //starting word to test out the game
let guessedLetters = []; //This array will contain all the letters the player guesses. 
let remainingGuesses = 8;

const getWord = async function (){
    const response = await fetch("https://gist.githubusercontent.com/skillcrush-curriculum/7061f1d4d3d5bfe47efbfbcfe42bf57e/raw/5ffc447694486e7dea686f34a6c085ae371b43fe/words.txt");
    const words = await response.text(); 
    // console.log(words);
    const wordArray = words.split("\n");
    // console.log(wordArray);
    const randomIndex = Math.floor(Math.random()*wordArray.length);
    word = wordArray[randomIndex].trim();
    placeholder(word);
};

getWord();

// Function to add Placeholder symbol for Each Letter -----------------------

const placeholder = function (word) { 
    const placeholderLetters = []; 
    for (const letter of word){
        // console.log(letter);
        placeholderLetters.push("●");
    }
    wordInProgress.innerText = placeholderLetters.join("");
};

// placeholder(word); 

//Event Listener for the Button ------------------------------------------------

guessLetterButton.addEventListener ("click", function (e) {
    e.preventDefault(); //prevent reloading behavior
    message.innerText = ""; // empty the text of the message element 

    const guess = letterInput.value; //capture the value of the input
    // console.log(guess); //log out the value of the input
    
    const goodGuess = validateInput(guess); //call the function you made that checks the input, and pass it the input value as an argument. Save the result of this function call to a variable 
    // console.log(guess);//log it out to the console.

    if (goodGuess){
        makeGuess(guess);
    }
    letterInput.value = ""; //empty the value of the input
});

// Function to Check Player's Input ------------------------------------------------

const validateInput = function (input){
    const acceptedLetter = /[a-zA-Z]/; // Variable for the accepted letter sequece, a Regular expression. 
    if (input.length === 0) { //check if the input is empty
        message.innerText = "The input is empty. Type only one letter."; //Each condition should have a message directing the player on what to input. 
    } else if (input.length > 1 ) { //check if the player has entered more than one letter.
        message.innerText = "More than one letter input. Type only one letter.";
    } else if (!input.match(acceptedLetter)) { //checkif they’ve entered a character that doesn’t match the regular expression pattern
        message.innerText = "Input not a letter. Type only one letter from A to Z.";
    } else {
        return input;
    }
};

// Function to Capture Input ------------------------------------------------

const makeGuess = function(guess){ 
    guess = guess.toUpperCase(); //convert all letters to one casing
    if (guessedLetters.includes(guess)) { //check to see if your guessedLetters array already contains that letter
        message.innerText = "Input was already guessed. Try again."; //If the player already guessed the same letter, update the message to in
    } else {    
        guessedLetters.push(guess);//If they haven’t guessed that letter before, add the letter to the guessedLetters array.
        console.log(guessedLetters);
        showGuessedLetters();
        updateGuessesRemaining (guess);
        updateWordInProgress(guessedLetters);
    }
};

// Function to Show the Guessed Letters --------------------------------------------

const showGuessedLetters = function () {  //function to update the page with the letters the player guesses
    guessedLettersElement.innerHTML = ""; //unordered list where the player’s guessed letters will display
    
    for (const letter of guessedLetters) {
        const li = document.createElement("li"); //Create a new list item for each letter 
        li.innerText = letter; 
        guessedLettersElement.append(li); //add it to the unordered list.
    };  
};

// Function to Update the Word in Progress --------------------------------------------

//This function will replace the circle symbols with the correct letters guessed.
const updateWordInProgress = function(guessedLetters) {
    const wordUpper = word.toUpperCase();
    const wordArray = wordUpper.split("");
    // console.log(wordArray);

    const revealWord = [];
    for (const letter of wordArray) {
        if (guessedLetters.includes(letter)) {
            revealWord.push(letter.toUpperCase());
        } else {
            revealWord.push("●");
        }
    }
    wordInProgress.innerText = revealWord.join("");
    checkIfWin();
};

// Function to Count Guesses Remaining --------------------------------------------

const updateGuessesRemaining = function (guess) {

    const upperWord = word.toUpperCase();

    if (!upperWord.includes(guess)) {
        message.innerText = `Sorry, the word does not contain the guess.`;
        remainingGuesses-=1;
    }  else {
        message.innerText = `Good guess! The guess is in the word.`;
    }

    if (remainingGuesses === 0) {
        message.innerHTML = `Game over! The word was <span class="highlight">${word}</span>.`;
        startOver();
    } else if (remainingGuesses === 1) {
        remainingGuessesSpan.innerText = `${remainingGuesses} guess`;
    } else {
        remainingGuessesSpan.innerText = `${remainingGuesses} guesses`;
    }
};

// Function to Check if the Player Won --------------------------------------------

const checkIfWin = function() {
    if (word.toUpperCase() === wordInProgress.innerText) {
        message.classList.add("win");
        message.innerHTML = `<p class="highlight">You guessed the correct word! Congrats!</p>`;
        startOver();
    }
};

const startOver = function () {
    guessLetterButton.classList.add("hide");
    remainingGuessesElement.classList.add("hide");
    guessedLettersElement.classList.add("hide");
    playAgainButton.classList.remove("hide");
  };
  
  playAgainButton.addEventListener("click", function () {
    message.classList.remove("win");
    guessedLetters = [];
    remainingGuesses = 8;
    remainingGuessesSpan.innerText = `${remainingGuesses} guesses`;
    guessedLettersElement.innerHTML = "";
    message.innerText = "";
  
    getWord();
  
    guessLetterButton.classList.remove("hide");
    playAgainButton.classList.add("hide");
    remainingGuessesElement.classList.remove("hide");
    guessedLettersElement.classList.remove("hide");
  });







