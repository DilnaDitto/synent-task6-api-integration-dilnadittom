document.addEventListener('DOMContentLoaded', () => {
    // Isolate Interactive Component Nodes from the Document Object Model
    const fetchButton = document.getElementById('fetch-trigger-btn');
    const displayArea = document.getElementById('content-display-area');
    const loadingSpinner = document.getElementById('loading-spinner');
    const errorPanel = document.getElementById('error-message-panel');
    
    const quoteTextField = document.getElementById('quote-text');
    const quoteAuthorField = document.getElementById('quote-author');

    // Attach Event Invocation Handler
    fetchButton.addEventListener('click', async () => {
        
        // 1. Enter Dynamic UI Loading State Presentation Mode
        displayArea.style.display = 'none';
        errorPanel.style.display = 'none';
        loadingSpinner.style.display = 'flex';
        
        fetchButton.disabled = true;
        fetchButton.innerText = 'Connecting API...';

        try {
            // 2. Dispatch Asynchronous Network Call to High-Availability Public API Gateway
            // Target: DummyJSON public random quote pipeline engine (No secret Auth keys required)
            const response = await fetch('https://dummyjson.com/quotes/random');
            
            // Validate HTTP Channel Status Integrity
            if (!response.ok) {
                throw new Error(`Server feedback anomaly encountered. Code status: ${response.status}`);
            }

            // 3. Extract and parse data from JSON stream payload
            const data = await response.json();

            // 4. Update the layout interface elements with fresh API text attributes
            quoteTextField.innerText = `"${data.quote}"`;
            quoteAuthorField.innerText = `— ${data.author}`;
            
            // Re-render Data Layout display block viewport
            displayArea.style.display = 'block';

        } catch (error) {
            // Document error vectors securely to the client system runtime developer console
            console.error('API Stream Pipeline Error Encountered:', error);
            
            // Reveal Network Exception Alert Panel View Component
            errorPanel.style.display = 'block';
            
        } finally {
            // 5. Tear Down Active Layout UI Flags
            loadingSpinner.style.display = 'none';
            fetchButton.disabled = false;
            fetchButton.innerText = 'Fetch Random Quote';
        }
    });
});