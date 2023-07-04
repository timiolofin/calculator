let num1 = null;
let operator = null;
let result = 0;
let previousInput = '';
let shouldResetDisplay = false;

const display = document.getElementById('currentOperationScreen');
const previous = document.getElementById('previousOperationScreen');

function updatePrevious() {
  if (previousInput !== '') {
    previous.textContent = previousInput;
  } else {
    previous.textContent = '\u00A0';
  }  
}

function updateDisplay(number) {
  if (display.textContent === '0' || shouldResetDisplay === true) {
    display.textContent = number;
    shouldResetDisplay = false;
  } else if (!display.textContent.includes('.') && number === '.') {
    display.textContent += number;
  } else if (number !== '.') {
    display.textContent += number;
  }
}

function handleOperator(operand) {
  if (num1 === null) {
    num1 = parseFloat(display.textContent);
    operator = operand;
    previousInput = display.textContent + ' ' + operator;
    shouldResetDisplay = true;
  } else {
    calculateResult();
    operator = operand;
    previousInput = result + ' ' + operator;
  }
  updatePrevious();
}

function calculateResult() {
  if (num1 !== null && operator !== null) {
    const num2 = parseFloat(display.textContent);
    if (operator === '÷' && num2 === 0) {
      alert('Error: Cannot divide by 0');
      num1 = null;
      operator = null;
      shouldResetDisplay = true;
    } else {
      const intermediateResult = operate(num1, num2, operator);
      result = intermediateResult.toFixed(2);
      display.textContent = result;
      num1 = intermediateResult;
      operator = null;
      shouldResetDisplay = true;
    }
    previousInput = previousInput + ' ' + num2 + ' =';
    updatePrevious();
  }
}


function toggleSign() {
  display.textContent = parseFloat(display.textContent) * -1;
}

function calculatePercentage() {
  let num = parseFloat(display.textContent);
  let percentage = num/100;
  display.textContent = percentage;
}

function backSpace() {
  display.textContent = display.textContent.slice(0, -1);
}

function clearDisplay() {
  display.textContent = '0';
  num1 = null;
  operator = null;
  shouldResetDisplay = false;
  previousInput = '';
  updatePrevious();
}

function add(a, b) {
  return a + b;
}

function subtract(a, b) {
  return a - b;
}

function multiply(a, b) {
  return a * b;
}

function divide(a, b) {
  return a / b;
}

function operate(a, b, operator) {
  if (operator === '+') {
    return add(a, b);
  } else if (operator === '-') {
    return subtract(a, b);
  } else if (operator === 'x') {
    return multiply(a, b);
  } else if (operator === '÷') {
    return divide(a, b);
  } else {
    return 'Invalid operator';
  }
}

document.addEventListener('keydown', keys);

function keys(e) {
  const key = e.key;

  if (/[0-9/.]/.test(key)) {
    updateDisplay(key);
    e.preventDefault();
    return;
  }

  if (key === '+' || key === '-' || key === '*') {
    handleOperator(key);
    e.preventDefault();
    return;
  }

  if (key === 'Backspace') {
    backSpace();
    e.preventDefault();
    return;
  }

  if (key === 'Enter' || key === '=') {
    calculateResult();
    e.preventDefault();
    return;
  }

  if (key === 'Escape') {
    clearDisplay();
    e.preventDefault();
    return;
  }
}

updatePrevious();