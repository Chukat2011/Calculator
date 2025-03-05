function register() {
    const username = document.getElementById('username').value;
    const password = document.getElementById('password').value;
    const message = document.getElementById('message');

    if (localStorage.getItem(username)) {
        message.innerText = 'Username already exists';
        return;
    }

    localStorage.setItem(username, password);
    message.innerText = 'Registration successful';
}

function login() {
    const username = document.getElementById('username').value;
    const password = document.getElementById('password').value;
    const message = document.getElementById('message');

    const storedPassword = localStorage.getItem(username);

    if (storedPassword === password) {
        message.innerText = 'Login successful';
        localStorage.setItem('currentUser', username);
        showSection('people');
    } else {
        message.innerText = 'Invalid username or password';
    }
}