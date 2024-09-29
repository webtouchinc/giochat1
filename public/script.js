document.addEventListener("DOMContentLoaded", function () {
    let currentUsername; // Store the current username

    // Show terms modal
    $('#terms-modal').modal('show');

    // Agree to terms
    document.getElementById('agree-btn').onclick = function () {
        $('#terms-modal').modal('hide');
        document.getElementById('chat-room').classList.remove('d-none');
        displayStatusMessage('You have joined the chat room successfully!', 'success');
    };

    // Toggle dark mode
    document.getElementById('theme-toggle').onclick = function () {
        document.body.classList.toggle('dark-mode');
    };

    // Join room
    document.getElementById('join-room').onclick = function () {
        const roomId = document.getElementById('room-id').value;
        currentUsername = document.getElementById('username').value; // Store the username
        if (roomId && currentUsername) {
            // You would connect to your chat server here
            updateUserCount(1); // Simulated user count
            displayStatusMessage('You have joined the chat room successfully!', 'success');
            // Add more logic here to handle the actual connection to the chat room
        } else {
            displayStatusMessage('Please enter a room ID and username.', 'danger');
        }
    };

    // Send message
    document.getElementById('send-message').onclick = function () {
        const message = document.getElementById('message-input').value;
        if (message && currentUsername) {
            const chatBox = document.getElementById('chat-box');
            chatBox.innerHTML += `<div><strong>${currentUsername}:</strong> ${message}</div>`;
            document.getElementById('message-input').value = '';
            chatBox.scrollTop = chatBox.scrollHeight; // Scroll to the bottom
        }
    };

    // Send image
    document.getElementById('send-file').onclick = function () {
        const fileInput = document.getElementById('file-input');
        fileInput.click(); // Trigger file input click
    };

    // Handle file selection
    document.getElementById('file-input').addEventListener('change', function (event) {
        const file = event.target.files[0];
        if (file && currentUsername) {
            const reader = new FileReader();
            reader.onload = function (e) {
                const chatBox = document.getElementById('chat-box');
                chatBox.innerHTML += `<div><strong>${currentUsername}:</strong><br><img src="${e.target.result}" style="max-width: 100%; max-height: 200px;"/></div>`;
                chatBox.scrollTop = chatBox.scrollHeight; // Scroll to the bottom
            };
            reader.readAsDataURL(file); // Read the image file as a data URL
        }
    });

    // Display status message
    function displayStatusMessage(message, type) {
        const statusMessage = document.getElementById('status-message');
        statusMessage.textContent = message;
        statusMessage.className = `alert alert-${type}`;
        statusMessage.classList.remove('d-none');

        // Hide message after 3 seconds
        setTimeout(() => {
            statusMessage.classList.add('d-none');
        }, 3000);
    }

    // Simulated user count
    function updateUserCount(count) {
        document.getElementById('user-count').textContent = `Users Online: ${count}`;
    }

    // Disconnect button functionality
    document.getElementById('disconnect-btn').onclick = function () {
        displayStatusMessage('You have disconnected from the chat room.', 'danger');
        // Additional logic for disconnecting the user goes here
    };
});
