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

// Show Section
function showSection(section) {
    const calculator = document.querySelector('.calculator');
    const converter = document.querySelector('.converter');
    const drawing = document.querySelector('.drawing');
    const games = document.querySelector('.games');
    const auth = document.querySelector('.auth');
    const people = document.querySelector('.people');
    const messenger = document.querySelector('.messenger');

    calculator.style.display = 'none';
    converter.style.display = 'none';
    drawing.style.display = 'none';
    games.style.display = 'none';
    auth.style.display = 'none';
    people.style.display = 'none';
    messenger.style.display = 'none';

    if (section === 'calculator') {
        calculator.style.display = 'block';
    } else if (section === 'converter') {
        converter.style.display = 'block';
    } else if (section === 'drawing') {
        drawing.style.display = 'block';
    } else if (section === 'games') {
        games.style.display = 'block';
    } else if (section === 'auth') {
        auth.style.display = 'block';
    } else if (section === 'people') {
        people.style.display = 'block';
        loadUsers();
    } else if (section === 'messenger') {
        messenger.style.display = 'block';
        loadMessages();
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