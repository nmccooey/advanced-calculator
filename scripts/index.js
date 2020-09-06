let runningTotal = 0;
let currentDisplay = "0";
const displayResult = document.querySelector(".display-result");

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

function handleNumber(data) {
  if (currentDisplay === "0") {
      currentDisplay = data;
  } else {
      currentDisplay += data;
  }
}

function handleOperation(data) {
  switch (data) {
    case "clear":
      currentDisplay = "0";
      render();
      break;
    case "delete":
      currentDisplay = currentDisplay.substring(0, currentDisplay.length - 1);
      if (currentDisplay.length < 1) {
          currentDisplay = "0";
      }
      render();
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

initEventHandlers();