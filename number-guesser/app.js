/**
 * Guess number between min and max
 * Player gets limited guesses
 * Notify player of guesses remaining
 * Notify the player of the correct answer if loose
 * Let player choose play again
 */

const gameUi = document.querySelector('.js-game');
const inputField = document.querySelector('.js-input');
const result = document.querySelector('.js-result');
const submitBtn = document.querySelector('.js-submit');
let generateAnswer = randomNumber(1, 10);
let guessCounter = 3;



gameUi.addEventListener('submit', (e) => {
  e.preventDefault();

  runGame();
});

function runGame() {
  let correctAnswer = generateAnswer;
  const userInput = parseInt(inputField.value);

  console.log(`Correct Answer is: ${correctAnswer}`);

  if (guessCounter > 1) {
    printResult('reset');

    if (userInput === correctAnswer) {
      printResult('correct');
      guessCounter = 0;
    } else {
      guessCounter--;
      printResult('wrong');
    }
  } else if (guessCounter === 1) {
    printResult('reset');

    if (userInput === correctAnswer) {
      printResult('correct');
      guessCounter = 0;
    } else {
      guessCounter--;
      printResult('disabled');
    }
  } else {
    resetGame();
  }

  console.log(guessCounter);
}

function printResult(statement) {
  const userInput = parseInt(inputField.value);

  if (statement === 'correct') {
    modifyClass(inputField, 'add', 'is-correct');
    inputField.disabled = true;

    addText(submitBtn, 'Play Again');
    
    addText(result, `${userInput} is correct!`);
    modifyClass(result, 'add', 'is-correct');
    changeVisibility(result, 'show'); 
  }

  if (statement === 'wrong') {
    modifyClass(inputField, 'add', 'is-wrong');

    addText(result, `Wrong answer. You have ${guessCounter} chances left.`);
    modifyClass(result, 'add', 'is-wrong');
    changeVisibility(result, 'show');
  }

  if (statement === 'disabled') {
    modifyClass(inputField, 'add', 'is-disabled');
    inputField.disabled = true;

    addText(submitBtn, 'Play Again');

    addText(result, 'Out of chances.');
    modifyClass(result, 'add', 'is-wrong');
  }

  if (statement === 'reset') {
    modifyClass(inputField, 'remove', 'is-wrong');
    modifyClass(result, 'remove', 'is-wrong');
  }
}

function resetGame() {
  modifyClass(inputField, 'remove', 'is-wrong');
  modifyClass(inputField, 'remove', 'is-correct');
  modifyClass(inputField, 'remove', 'is-disabled');
  inputField.disabled = false;

  modifyClass(result, 'remove', 'is-wrong');
  modifyClass(result, 'remove', 'is-correct');
  
  addText(submitBtn, 'Calculate');

  changeVisibility(result, 'hide');

  generateAnswer = randomNumber(1, 10);

  guessCounter = 3;

  console.log(`New number is ${generateAnswer}`);
}



// Helpers
function randomNumber(min, max) {
  const num = Math.floor((Math.random() * max) + min);
  return num;
}

function modifyClass(element, action, selector) {
  if (action === 'add') {
    element.classList.add(selector);
  }

  if (action === 'remove') {
    element.classList.remove(selector);
  }
}

function addText(element, text) {
  element.textContent = text;
}

function changeVisibility(element, action) {
  if (action === 'show') {
    element.classList.remove('is-hidden');
  }

  if (action === 'hide') {
    element.classList.add('is-hidden');
  }

  if (action === 'toggle') {
    element.classList.toggle('is-hidden')
  }
}