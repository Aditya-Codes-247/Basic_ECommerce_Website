document.addEventListener('DOMContentLoaded', function() {
    fetchMessages();
});

function fetchMessages() {
    fetch('http://localhost:3000/messages')

        .then(response => response.json())
        .then(messages => {
            const mainContent = document.querySelector('.main-content');
            mainContent.innerHTML = ''; // Clear previous messages
            messages.forEach(message => {
                const messageElement = document.createElement('div');
                messageElement.textContent = message.content;
                mainContent.appendChild(messageElement);
            });
        })
        .catch(error => console.error('Error fetching messages:', error));
}
