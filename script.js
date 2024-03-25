// script.js

function appendMessage(message, sender) {
    const chatContainer = document.getElementById('chat-container');
    const messageContainer = document.createElement('div');
    messageContainer.classList.add('message-container');
    
    // Creating a span inside the container allows for more flexible styling.
    const messageElement = document.createElement('span');
    messageElement.textContent = message;
    
    if (sender === 'User') {
        messageContainer.style.justifyContent = 'flex-end'; // Align to right
        messageElement.classList.add('user-message');
    } else {
        messageContainer.style.justifyContent = 'flex-start'; // Align to left
        messageElement.classList.add('bot-message');
    }

    messageContainer.appendChild(messageElement);
    chatContainer.appendChild(messageContainer);
    chatContainer.scrollTop = chatContainer.scrollHeight; // Auto-scroll to bottom
}

function toggleChatbot() {
    var chatbotInterface = document.getElementById('chatbot-interface');
    chatbotInterface.classList.toggle('visible');
}



function sendMessage() {
    const userInput = document.getElementById('user-input').value.trim();
    if (userInput === '') return;

    appendMessage(userInput, 'User');

    fetch('http://localhost:5005/webhooks/rest/webhook', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({ message: userInput })
    })
    .then(response => response.json())
    .then(data => {
        const botResponse = data[0].text;
        appendMessage(botResponse, 'Bot');
    })
    .catch(error => {
        console.error('Error:', error);
    });

    document.getElementById('user-input').value = '';
}
