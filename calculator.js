let display = document.getElementById('display');
let currentInput = '';
let previousInput = '';
let operation = null;

function appendNumber(number) {
    if (currentInput === '0' && number === '0') return;
    if (currentInput === '0' && number !== '.') {
        currentInput = number;
    } else {
        currentInput += number;
    }
    updateDisplay();
}

function chooseOperation(op) {
    if (currentInput === '') return;
    if (previousInput !== '') {
        compute();
    }
    operation = op;
    previousInput = currentInput;
    currentInput = '';
}

function compute() {
    let result;
    const prev = parseFloat(previousInput);
    const current = parseFloat(currentInput);
    if (isNaN(prev) || isNaN(current)) return;
    switch (operation) {
        case '+':
            result = prev + current;
            break;
        case '-':
            result = prev - current;
            break;
        case '*':
            result = prev * current;
            break;
        case '/':
            result = prev / current;
            break;
        default:
            return;
    }
    currentInput = result.toString();
    operation = null;
    previousInput = '';
    updateDisplay();
}

function clearDisplay() {
    currentInput = '';
    previousInput = '';
    operation = null;
    updateDisplay();
}

function updateDisplay() {
    display.innerText = currentInput;
}

// dat.GUI Theme Switcher
const gui = new dat.GUI();
const themeController = {
    theme: 'light'
};

gui.add(themeController, 'theme', ['light', 'dark']).onChange(changeTheme);

function changeTheme(theme) {
    const calculator = document.querySelector('.calculator');
    const buttons = document.querySelectorAll('.buttons button');
    const display = document.querySelector('.display');

    switch (theme) {
        case 'light':
            calculator.style.backgroundColor = '#fff';
            display.style.backgroundColor = '#fff';
            display.style.color = '#000';
            buttons.forEach(button => {
                button.style.backgroundColor = '#f0f0f0';
                button.style.color = '#000';
            });
            break;
        case 'dark':
            calculator.style.backgroundColor = '#333';
            display.style.backgroundColor = '#333';
            display.style.color = '#fff';
            buttons.forEach(button => {
                button.style.backgroundColor = '#555';
                button.style.color = '#fff';
            });
            break;
        default:
            break;
    }
}