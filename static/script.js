document.addEventListener("DOMContentLoaded", function() {
    const chatHistory = document.getElementById("chat-history");
    const userInput = document.getElementById("user-input");
    const sendButton = document.getElementById("send-button");

    sendButton.addEventListener("click", () => {
        const userMessage = userInput.value;
        if (userMessage.trim() !== "") {
            appendMessage(userMessage, "user");
            userInput.value = "";

            // Send user input to the server and get a response
            fetch("/get_response", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({ user_input: userMessage }),
            })
            .then(response => response.json())
            .then(data => {
                const botResponse = data.response;
                appendMessage(botResponse, "bot");
            })
            .catch(error => console.error("Error:", error));
        }
    });

    function appendMessage(message, sender) {
        const messageElement = document.createElement("div");
        messageElement.classList.add("message", sender);
        messageElement.textContent = message;
        chatHistory.appendChild(messageElement);
        chatHistory.scrollTop = chatHistory.scrollHeight;
    }
});

document.addEventListener("DOMContentLoaded", function () {
    const chatContainer = document.querySelector(".chat-container");
    const body = document.body;
    const toggleDarkModeButton = document.getElementById("toggle-dark-mode");

    // Toggle Dark Mode
    toggleDarkModeButton.addEventListener("click", function () {
        body.classList.toggle("dark-mode");
        chatContainer.classList.toggle("dark-mode");
    });

    // Check user's device theme preference and apply adaptive dark/light mode
    const userPrefersDark = window.matchMedia("(prefers-color-scheme: dark)").matches;
    if (userPrefersDark) {
        body.classList.add("dark-mode");
        chatContainer.classList.add("dark-mode");
    }
});

