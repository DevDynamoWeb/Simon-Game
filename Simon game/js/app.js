let gameSeq = []; // Stores the sequence of colors the game generates
let userSeq = []; // Stores the sequence of colors the user inputs
let btnColors = ["yellow", "green", "red", "blue"]; // Array of possible button colors

let started = false; // Flag to check if the game has started
let level = 0; // Tracks the current level of the game

// Event listener to start the game on keypress
document.addEventListener("keypress", () => {
  if (!started) {
    started = true;
    nextSequence();
  }
});

// Function to flash the game button
function flashBtn(btn) {
  btn.classList.add("flash");
  setTimeout(() => {
    btn.classList.remove("flash");
  }, 200);
}

// Function to flash the user button
function userBtn(btn) {
  btn.classList.add("user");
  setTimeout(() => {
    btn.classList.remove("user");
  }, 200);
}

// Function to handle user button presses
function btnPresh(event) {
  let btn = this; // Get the button that was pressed
  userBtn(btn); // Flash the button

  let userColor = btn.getAttribute("id"); // Get the color of the button pressed
  userSeq.push(userColor); // Add the color to the user's sequence
  console.log(userSeq);

  checkAnswer(userSeq.length - 1);
}

function checkAnswer(idx) {
  // console.log('checkAnswer');
  if (userSeq[idx] === gameSeq[idx]) {
    if (userSeq.length == gameSeq.length) {
      setTimeout(nextSequence, 1000);
    }
  } else {
    document.querySelector("p").innerHTML = `Game Over! <b> Your Score was  ${level}  </b> Press any key to Start`;
    resetGame();
  }
}

// Function to generate the next sequence in the game
function nextSequence() {
  userSeq = []; // Reset the user sequence for the next level
  level++; // Increment the level
  document.querySelector("p").innerText = `Level ${level}`; // Update the level display

  let randIdx = Math.floor(Math.random() * 4); // Generate a random index
  let randColor = btnColors[randIdx]; // Get the color at the random index
  gameSeq.push(randColor); // Add the color to the game sequence
  console.log(gameSeq);

  let randBtn = document.querySelector(`#${randColor}`); // Get the button element
  flashBtn(randBtn); // Flash the button
}

function resetGame() {
  level = 0;
  gameSeq = [];
  started = false;
  // userSeq= [];
}

// Add event listeners to all buttons
let btns = document.querySelectorAll(".btns");
btns.forEach((btn) => {
  btn.addEventListener("click", btnPresh);
});