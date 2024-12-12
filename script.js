// Connect to the Socket.IO server (replace with your ngrok URL or your backend URL if hosted elsewhere)
const socket = io("https://your-ngrok-subdomain.ngrok.io"); // Replace with your ngrok or server URL

// DOM elements
const form = document.getElementById("chat-form");
const input = document.getElementById("message-input");
const messagesList = document.getElementById("messages");

// Send message when the form is submitted
form.addEventListener("submit", (event) => {
  event.preventDefault(); // Prevent the form from submitting the default way

  const message = input.value.trim();
  if (message) {
    // Emit the message to the server
    socket.emit("chat message", message);

    // Clear the input field
    input.value = "";
  }
});

// Listen for incoming chat messages from the server
socket.on("chat message", (msg) => {
  const li = document.createElement("li");

  // You can customize the format of the message here, adding timestamps, user names, etc.
  const timestamp = new Date().toLocaleTimeString();
  li.innerHTML = `
    <span class="timestamp">[${timestamp}]</span>
    <span class="username">User</span>: 
    <span class="message-text">${msg}</span>
  `;

  // Append the new message to the message list
  messagesList.appendChild(li);

  // Scroll to the bottom to show the latest message
  messagesList.scrollTop = messagesList.scrollHeight;
});
