document.addEventListener('DOMContentLoaded', () => {
    // Smooth scrolling for navigation links
    document.querySelectorAll('nav a').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();
            document.querySelector(this.getAttribute('href')).scrollIntoView({
                behavior: 'smooth'
            });
        });
    });

    // Search functionality for tools
    const searchInput = document.getElementById('tool-search');
    const toolCards = document.querySelectorAll('.tool-card');

    searchInput.addEventListener('keyup', (e) => {
        const searchTerm = e.target.value.toLowerCase();

        toolCards.forEach(card => {
            const title = card.querySelector('h4').textContent.toLowerCase();
            const description = card.querySelector('p').textContent.toLowerCase();
            // Optional: Include keywords from data-keywords attribute for more robust search
            const keywords = card.dataset.keywords ? card.dataset.keywords.toLowerCase() : '';

            if (title.includes(searchTerm) || description.includes(searchTerm) || keywords.includes(searchTerm)) {
                card.style.display = 'flex'; // Show the card
            } else {
                card.style.display = 'none'; // Hide the card
            }
        });
    });

    // Placeholder for "Generate" button functionality
    // This is where you would integrate your actual AI API calls
    document.querySelectorAll('.btn-secondary').forEach(button => {
        button.addEventListener('click', async (e) => {
            const toolCard = e.target.closest('.tool-card');
            const inputElement = toolCard.querySelector('.tool-input');
            const outputElement = toolCard.querySelector('.tool-output');
            const toolName = toolCard.querySelector('h4').textContent;

            outputElement.textContent = 'Generating...'; // Show loading state

            let inputValue = '';
            let file = null;

            if (inputElement.type === 'text' || inputElement.type === 'url') {
                inputValue = inputElement.value;
                if (!inputValue) {
                    outputElement.textContent = 'Please provide some input.';
                    return;
                }
            } else if (inputElement.type === 'file') {
                file = inputElement.files[0];
                if (!file) {
                    outputElement.textContent = 'Please upload a file.';
                    return;
                }
            }

            // --- IMPORTANT: This is where the AI integration logic goes ---
            // You will replace this placeholder with actual API calls to your backend (serverless function)
            // Example:
            // const response = await fetch('/.netlify/functions/generate-prompt', {
            //     method: 'POST',
            //     headers: { 'Content-Type': 'application/json' },
            //     body: JSON.stringify({
            //         tool: toolName,
            //         textInput: inputValue,
            //         file: file ? { name: file.name, type: file.type, size: file.size } : null // In reality, you'd send file data
            //     })
            // });
            // const data = await response.json();
            // outputElement.textContent = data.prompt || 'Failed to generate prompt.';

            // For now, simulating an AI response after a delay
            setTimeout(() => {
                if (toolName === 'Image to Prompt' && file) {
                    outputElement.textContent = `Generated AI prompt for "${file.name}": A vibrant landscape with soft natural light, detailed textures, and a dreamlike quality.`;
                } else if (toolName === 'Document Summary Prompt' && file) {
                    outputElement.textContent = `Summary of "${file.name}": The document discusses modern web technologies and their impact on user experience.`;
                } else if (toolName === 'YouTube Description Generator' && inputValue) {
                    outputElement.textContent = `Generated YouTube Description for "${inputValue}": Learn how to master web development in our latest tutorial! #webdev #tutorial`;
                } else if (inputValue) {
                    outputElement.textContent = `Generated prompt for "${toolName}" with input "${inputValue}": Your creative idea here!`;
                } else {
                    outputElement.textContent = `Generated a generic prompt for "${toolName}": A fantastical journey through time and space.`;
                }
                // Clear input after generation (optional)
                if (inputElement.type !== 'file') {
                     inputElement.value = '';
                } else {
                    inputElement.value = ''; // Reset file input
                }
            }, 2000); // Simulate 2-second delay for AI processing
        });
    });

    // Contact Form Submission (Placeholder)
    document.querySelector('.contact-form').addEventListener('submit', (e) => {
        e.preventDefault();
        alert('Thank you for your message! This is a placeholder. You would integrate a form submission service here.');
        e.target.reset(); // Clear form fields
    });

});