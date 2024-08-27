/*-------------------------------- Constants --------------------------------*/


// Query for the display element
const display = document.querySelector('.display');

// Query for all buttons
const buttons = document.querySelectorAll('.button');


/*-------------------------------- Variables --------------------------------*/


let currentNumber = '';  // Store the current number being typed
let previousNumber = ''; // Store the previous number
let operator = '';       // Store the operator selected
let result = null;       // Store the result of the calculation
let isResultDisplayed = false; // To check if the result is already displayed



/*----------------------------- Event Listeners -----------------------------*/



// Add event listeners to all buttons
buttons.forEach((button) => {
  button.addEventListener('click', (event) => {
    const buttonText = event.target.innerText;

    if (!isNaN(buttonText)) {
      // If a number button is clicked
      if (isResultDisplayed) {
        currentNumber = '';
        isResultDisplayed = false;
      }
      currentNumber += buttonText;
      display.innerText = currentNumber;
    } else if (buttonText === 'C') {
      // If the clear button is clicked
      currentNumber = '';
      previousNumber = '';
      operator = '';
      result = null;
      display.innerText = '';
    } else if (['+', '-', '*', '/'].includes(buttonText)) {
      // If an operator button is clicked
      if (currentNumber !== '') {
        if (operator) {
          calculate();  // If there's already an operator, calculate the current result
        } else {
          previousNumber = currentNumber;
        }
        currentNumber = '';
        operator = buttonText;
      }
    } else if (buttonText === '=') {
      // If the equals button is clicked
      if (currentNumber !== '' && previousNumber !== '' && operator !== '') {
        calculate();
        operator = '';  // Reset operator after calculation
        previousNumber = '';
        isResultDisplayed = true;
      }
    }
  });
});



/*-------------------------------- Functions --------------------------------*/



function calculate() {
  // Convert string numbers to float for calculation
  const num1 = parseFloat(previousNumber);
  const num2 = parseFloat(currentNumber);

  switch (operator) {
    case '+':
      result = num1 + num2;
      break;
    case '-':
      result = num1 - num2;
      break;
    case '*':
      result = num1 * num2;
      break;
    case '/':
      if (num2 !== 0) { // Prevent division by zero
        result = num1 / num2;
      } else {
        result = 'Error';
      }
      break;
    default:
      return;
  }

  // Display the result
  display.innerText = result;
  currentNumber = result.toString();
}
