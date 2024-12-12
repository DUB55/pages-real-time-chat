const socket = io('https://your-vercel-app-url.vercel.app');
let username = '';

document.getElementById('join-chat').addEventListener('click', () => {
    username = document.getElementById('username-input').value.trim();
    if (username) {
        document.getElementById('welcome-screen').style.display = 'none';
        document.getElementById('chat-screen').style.display = 'block';
    }
});

document.getElementById('send-message').addEventListener('click', sendMessage);
document.getElementById('message').addEventListener('keypress', (e) => {
    if (e.key === 'Enter') sendMessage();
});

function sendMessage() {
    const messageInput = document.getElementById('message');
    const message = messageInput.value.trim();
    if (message) {
        socket.emit('chat message', { username, message });
        messageInput.value = '';
    }
}

socket.on('chat message', (data) => {
    const chatWindow = document.getElementById('chat-window');
    const messageElement = document.createElement('div');
    messageElement.textContent = `${data.username}: ${data.message}`;
    chatWindow.appendChild(messageElement);
    chatWindow.scrollTop = chatWindow.scrollHeight;
});
