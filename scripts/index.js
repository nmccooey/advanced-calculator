let runningTotal = 0;
let currentDisplay = "0";
let previousOperator = null;
const displayResult = document.querySelector(".display-result");

// Initializes event listeners for all calculator button clicks.
function initEventHandlers() {
  const calcContainer = document.querySelector(".calc-container");
  const calcButtons = calcContainer.querySelectorAll(".calc-button");
  for (const button of calcButtons) {
    button.addEventListener('click', handleClick);
  }

  // Checks if click was on a number or an operation.
  function handleClick(event) {
    let data = event.target.getAttribute("data");
    if (isNaN(data - 1)) {
      handleOperation(data);
    } else {
      handleNumber(data);
      render();
    }
  }
}

// User clicks a number.
function handleNumber(data) {
  if (currentDisplay === "0") {
      currentDisplay = data;
  } else {
      if (currentDisplay.length < 16) {
        currentDisplay += data;
      }
  }
}

// User clicks anything except a number.
function handleOperation(data) {
  switch (data) {
    case "clear":
      reset()
      render();
      break;
    case "delete":
      currentDisplay = currentDisplay.substring(0, currentDisplay.length - 1);
      if (currentDisplay.length < 1) {
          currentDisplay = "0";
      }
      render();
      break;
    case "plusminus":
      if (Number(currentDisplay) > 0) {
          currentDisplay = posToNeg(Number(currentDisplay));
      } else if (Number(currentDisplay) < 0) {
          currentDisplay = negToPos(Number(currentDisplay));
      } else {
          currentDisplay = "0";
      }
      render();
      break;
    case "decimal":
      if (!currentDisplay.includes(".")) {
          currentDisplay += ".";
      }
      render();
      break;
    case "pi":
      currentDisplay = "3.14159265358";
      render();
      break;
    case "factorial":
      currentDisplay = "" + factorial(Number(currentDisplay));
      render();
      break;
    case "power2":
      currentDisplay = "" + power(Number(currentDisplay), 2);
      render();
      break;
    case "power3":
      currentDisplay = "" + power(Number(currentDisplay), 3);
      render();
      break;
    case "squareroot":
      currentDisplay = "" + squareRoot(Number(currentDisplay));
      render();
      break;
    case "percent":
      currentDisplay = "" + percent(Number(currentDisplay));
      render();
      break;
    case "equals":
      if (previousOperator === null) {
        return;
      }
      operate(Number(currentDisplay));
      previousOperator = null;
      currentDisplay = "" + runningTotal;
      runningTotal = 0;
      render();
      break;
    default:
      handleMath(data);
      break;
  }
}

function reset() {
  previousOperator = null;
  currentDisplay = "0";
  runningTotal = 0;
}

function handleMath(operator) {
  const intCurrentDisplay = Number(currentDisplay);

  if (runningTotal === 0) {
      runningTotal = intCurrentDisplay;
  } else {
      operate(intCurrentDisplay);
      currentDisplay = "" + runningTotal;
      render();
  }
  previousOperator = operator;
  currentDisplay = "0";
}

function operate(intCurrentDisplay) {
  switch (previousOperator) {
    case "plus":
      runningTotal = add(runningTotal, intCurrentDisplay);
      break;
    case "minus":
      runningTotal = subtract(runningTotal, intCurrentDisplay);
      break;
    case "multiply":
      runningTotal = multiply(runningTotal, intCurrentDisplay);
      break;
    case "divide":
      runningTotal = divide(runningTotal, intCurrentDisplay);
      break;
  }
}

function render() {
  if (currentDisplay.length > 14) {
    displayResult.classList.add("display-result-small");
    displayResult.innerText = currentDisplay;
  } else {
    displayResult.classList.remove("display-result-small");
    displayResult.innerText = currentDisplay;
  }
}

function add(num1 , num2) {
  return num1 + num2;
}

function subtract(num1 , num2) {
  return num1 - num2;
}

function divide(num1 , num2) {
  return num1 / num2;
}

function multiply(num1 , num2) {
  return num1 * num2;
}

function squareRoot(num) {
  return Math.sqrt(num);
}

function factorial(num) {
  if (num < 0) {
    return -1;
  } else if (num == 0) {
    return 1;
  } else {
    return (num * factorial(num - 1));
  }
}

function power(num, power) {
  return num ** power;
}

function percent(num) {
  return num / 100;
}

function posToNeg(number) {
  return -Math.abs(number);
}

function negToPos(number) {
  return Math.abs(number);
}

initEventHandlers();