function loadUsers() {
    const userList = document.getElementById('userList');
    userList.innerHTML = '';

    for (let i = 0; i < localStorage.length; i++) {
        const key = localStorage.key(i);
        if (key !== 'currentUser' && key !== 'messages') {
            const li = document.createElement('li');
            li.innerText = key;
            li.onclick = () => startChat(key);
            userList.appendChild(li);
        }
    }
}

function startChat(username) {
    localStorage.setItem('chatWith', username);
    showSection('messenger');
}