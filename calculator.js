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

// dat.GUI Theme Switcher and Mode Switcher
const gui = new dat.GUI();
const themeController = {
    theme: 'light',
    mode: 'calculator'
};

gui.add(themeController, 'theme', ['light', 'dark']).onChange(changeTheme);
gui.add(themeController, 'mode', ['calculator', 'converter']).onChange(changeMode);

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

function changeMode(mode) {
    const calculator = document.querySelector('.calculator');
    const converter = document.querySelector('.converter');

    if (mode === 'calculator') {
        calculator.style.display = 'block';
        converter.style.display = 'none';
    } else if (mode === 'converter') {
        calculator.style.display = 'none';
        converter.style.display = 'block';
    }
}

// Converter Logic
function convert() {
    const fromUnit = document.getElementById('fromUnit').value;
    const toUnit = document.getElementById('toUnit').value;
    const value = parseFloat(document.getElementById('value').value);
    let result;

    if (fromUnit === 'm' && toUnit === 'km') {
        result = value / 1000;
    } else if (fromUnit === 'km' && toUnit === 'm') {
        result = value * 1000;
    } else if (fromUnit === 'usd' && toUnit === 'eur') {
        result = value * 0.85; // Example rate
    } else if (fromUnit === 'eur' && toUnit === 'usd') {
        result = value * 1.18; // Example rate
    } else {
        result = value;
    }

    document.getElementById('result').innerText = `Result: ${result} ${toUnit}`;
}