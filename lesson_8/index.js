class Calculator {
  constructor(previousOperandElement, currentOperandElement, historyElement) {
    this.previousOperandElement = previousOperandElement;
    this.currentOperandElement = currentOperandElement;
    this.historyElement = historyElement;
    this.history = [];
    this.clear();
  }

  clear() {
    this.previousOperand = '';
    this.currentOperand = '';
    this.operation = '';
  }

  delete() {
    this.currentOperand = this.currentOperand.toString().slice(0, -1);
  }
  
  appendNumber(number) {
    if (number === '.' && this.currentOperand.includes('.')) {
      return;
    }

    if (this.currentOperand === '0' && number !== '.') {
      this.currentOperand = '';
    }

    this.currentOperand = this.currentOperand + number.toString();
  }

  chooseOperation(operation) {
    if (this.currentOperand === '') {
      return;
    } 

    this.compute();
    this.operation = operation;
    this.previousOperand = this.currentOperand;
    this.currentOperand = '';
  }

  changeSign() {
    this.currentOperand = -this.currentOperand;

  }

  createHistoryItem(computeText) {
    this.history.push(computeText);

    const historyElemItem = document.createElement('p');
    historyElemItem.classList.add('calculator__history-item');
    historyElemItem.textContent = computeText;
    historyElement.after(historyElemItem);
  }

  compute() {
    let computation;
    const prev = parseFloat(this.previousOperand);
    const current = parseFloat(this.currentOperand);

    if (isNaN(prev) || isNaN(current)) {
      return;
    }

    switch (this.operation) {
      case '+':
        computation = prev + current;
        break;
      case '-':
        computation = prev - current;
        break;
      case '*':
        computation = prev * current;
        break;
      case '÷':
        computation = prev / current;
        break;
      default:
        return;
    }

    const computeText = `${this.previousOperand} ${this.operation} ${this.currentOperand} = ${computation}`;
    
    this.createHistoryItem(computeText);
    this.currentOperand = computation;
    this.operation = undefined;
    this.previousOperand = '';
  }

  getDisplayNumber(number) {
    const stringNumber = number.toString();
    const integerDigits = parseInt(stringNumber.split('.')[0]);
    const decimalDigits = stringNumber.split('.')[1];
    let integerDisplay;

    if (isNaN(integerDigits)) {
      integerDisplay = '';
    } else {
      integerDisplay = integerDigits.toLocaleString('en');
    }

    if (decimalDigits) {
      return `${integerDisplay}.${decimalDigits}`;
    } else {
      return integerDisplay;
    }
  }

  updateDisplay() {
    this.currentOperandElement.innerText = this.getDisplayNumber(this.currentOperand);

    if (this.operation) {
      this.previousOperandElement.innerText = `${this.getDisplayNumber(this.previousOperand)} ${this.operation}`;
    } else {
      this.previousOperandElement.innerText = '';
    }
  }
}

const previousOperandElement = document.querySelector('[data-previous-operand]');
const currentOperandElement = document.querySelector('[data-current-operand]');
const historyElement = document.querySelector('.calculator__history-title');
const calcButtonsWrapper = document.querySelector('.calculator__buttons');

const calculator = new Calculator(previousOperandElement, currentOperandElement, historyElement);

calcButtonsWrapper.addEventListener('click', (event) => {
  const target = event.target;
  const targetText = target.dataset.calc;

  switch(targetText) {
    case 'operation':
      calculator.chooseOperation(target.textContent);
      break;
    case 'equals':
      calculator.compute();
      break;
    case 'clear':
      calculator.clear();
      break;
    case 'delete':
      calculator.delete();
      break;
    case 'sign':
      calculator.changeSign();
      break;
    default:
      calculator.appendNumber(targetText);
  }

  calculator.updateDisplay();
});