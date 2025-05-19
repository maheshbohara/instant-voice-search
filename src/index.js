/**
 * Instant Voice Search frontend functionality.
 */

import './style.css';

class VoiceSearchBar {
    constructor() {
        this.recognition = null;
        this.isListening = false;
        this.init();
    }

    init() {
        // Check if browser supports speech recognition
        if (!('webkitSpeechRecognition' in window) && !('SpeechRecognition' in window)) {
            console.warn('Speech recognition not supported in this browser.');
            this.showBrowserSupportMessage();
            return;
        }

        // Initialize speech recognition
        const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;
        this.recognition = new SpeechRecognition();
        this.recognition.continuous = false;
        this.recognition.interimResults = false;
        this.recognition.lang = document.documentElement.lang || 'en-US';

        // Find all search forms with more specific selectors
        const searchForms = document.querySelectorAll(
            'form[role="search"], ' + // Default WordPress search form
            'form.search-form, ' + // Common search form class
            'form.woocommerce-product-search, ' + // WooCommerce search
            'form#searchform, ' + // Default WordPress search form ID
            'form.searchform, ' + // Alternative search form class
            'form[action*="search"]' // Any form with search in action
        );
        
        searchForms.forEach(form => {
            // More specific input selectors
            const searchInput = form.querySelector(
                'input[type="search"], ' +
                'input[name="s"], ' +
                'input.search-field, ' +
                'input#s, ' +
                'input.search-input'
            );            
            
            if (!searchInput) return;

            // Create and append microphone icon
            const micIcon = this.createMicIcon();
            
            // Add wrapper for input and icon
            const inputWrapper = document.createElement('div');
            inputWrapper.className = 'voice-search-input-wrapper';
            searchInput.parentNode.insertBefore(inputWrapper, searchInput);
            inputWrapper.appendChild(searchInput);
            inputWrapper.appendChild(micIcon);

            // Add event listeners
            micIcon.addEventListener('click', (e) => {
                e.preventDefault();
                this.toggleListening(micIcon, searchInput, form);
            });

            // Handle recognition results
            this.recognition.onresult = (event) => {
                const transcript = event.results[0][0].transcript;
                searchInput.value = transcript;
                form.submit();
            };

            // Handle errors
            this.recognition.onerror = (event) => {
                console.error('Speech recognition error:', event.error);
                this.stopListening(micIcon);
            };

            // Handle end of recognition
            this.recognition.onend = () => {
                this.stopListening(micIcon);
            };
        });
    }

    createMicIcon() {
        const icon = document.createElement('span');
        icon.className = 'voice-search-mic';
        icon.innerHTML = `
            <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                <path d="M12 1a3 3 0 0 0-3 3v8a3 3 0 0 0 6 0V4a3 3 0 0 0-3-3z"></path>
                <path d="M19 10v2a7 7 0 0 1-14 0v-2"></path>
                <line x1="12" y1="19" x2="12" y2="23"></line>
                <line x1="8" y1="23" x2="16" y2="23"></line>
            </svg>
        `;
        icon.setAttribute('aria-label', 'Start voice search');
        return icon;
    }

    toggleListening(button, input, form) {
        if (this.isListening) {
            this.stopListening(button);
        } else {
            this.startListening(button);
        }
    }

    startListening(button) {
        this.isListening = true;
        button.classList.add('listening');
        button.setAttribute('aria-label', 'Stop voice search');
        this.recognition.start();
    }

    stopListening(button) {
        this.isListening = false;
        button.classList.remove('listening');
        button.setAttribute('aria-label', 'Start voice search');
        this.recognition.stop();
    }

    showBrowserSupportMessage() {
        const message = document.createElement('div');
        message.className = 'voice-search-browser-message';
        message.innerHTML = `
            <p>Voice search is not supported in your browser. Please use Chrome, Edge, Safari, or Opera for the best experience.</p>
        `;
        document.body.appendChild(message);
        
        // Remove message after 5 seconds
        setTimeout(() => {
            message.remove();
        }, 5000);
    }
}

// Initialize when DOM is ready
document.addEventListener('DOMContentLoaded', () => {
    new VoiceSearchBar();
}); 