function loadMessages() {
    const chat = document.getElementById('chat');
    chat.innerHTML = '';

    const currentUser = localStorage.getItem('currentUser');
    const chatWith = localStorage.getItem('chatWith');

    const messages = JSON.parse(localStorage.getItem('messages')) || [];

    messages.forEach(message => {
        if ((message.sender === currentUser && message.receiver === chatWith) ||
            (message.sender === chatWith && message.receiver === currentUser)) {
            const div = document.createElement('div');
            div.className = 'message';
            div.innerHTML = `<div class="sender">${message.sender}:</div><div class="content">${message.content}</div>`;
            chat.appendChild(div);
        }
    });
}

function sendMessage() {
    const messageInput = document.getElementById('messageInput');
    const messageContent = messageInput.value;
    const currentUser = localStorage.getItem('currentUser');
    const chatWith = localStorage.getItem('chatWith');

    if (messageContent.trim() === '') return;

    const messages = JSON.parse(localStorage.getItem('messages')) || [];
    messages.push({
        sender: currentUser,
        receiver: chatWith,
        content: messageContent
    });

    localStorage.setItem('messages', JSON.stringify(messages));
    messageInput.value = '';
    loadMessages();
}