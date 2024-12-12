const socket = io("http://localhost:3000"); // Connect to the local WebSocket server

// Send a message when the user submits the form
document.getElementById("chatForm").addEventListener("submit", function (event) {
  event.preventDefault();
  const message = document.getElementById("messageInput").value;
  socket.emit("chat message", message); // Send message to the server
  document.getElementById("messageInput").value = ""; // Clear input
});

// Listen for incoming messages from the server
socket.on("chat message", function (msg) {
  const li = document.createElement("li");
  li.textContent = msg;
  document.getElementById("messages").appendChild(li);
});
