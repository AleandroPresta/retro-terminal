class PasswordKeypad {
    constructor(container) {
        this.container = container;
        this.passwordUrl = 'src/password/password.html';
    }

    async initialize() {
        try {
            const response = await fetch(this.passwordUrl);
            if (!response.ok) {
                throw new Error(`Error fetching at ${this.passwordUrl}`);
            }
            const html = await response.text();
            this.container.innerHTML = html;
        } catch (error) {
            console.error('Failed to fetch password.html:', error);
            this.container.innerHTML = '<p>Error loading keypad. Please try again later.</p>';
        }

        this.currentRow = 0;
        this.currentCol = 0;
        this.password = '';
        this.keys = document.querySelectorAll('.key');
        this.digits = document.querySelectorAll('.digit');
        this.correctPassword = '1996';
        this.errorSound = document.getElementById('error-sound');
        this.updateSelection();
        this.handleKeyPressBound = this.handleKeyPress.bind(this);
        document.addEventListener('keydown', this.handleKeyPressBound);
        // Add click event listeners to all keys
        this.keys.forEach(key => {
            key.addEventListener('click', () => {
                const value = key.dataset.value;
                if (value === 'clear') {
                    this.password = '';
                    this.updateDisplay();
                } else if (value === 'enter') {
                    if (this.password.length === 4) {
                        this.submitPassword();
                    }
                } else if (this.password.length < 4) {
                    this.password += value;
                    this.updateDisplay(value);
                }
            });
        });
    }

    updateSelection() {
        this.keys.forEach(key => key.classList.remove('selected'));
        const index = this.currentRow * 3 + this.currentCol;
        if (index >= 0 && index < this.keys.length) {
            this.keys[index].classList.add('selected');
        }
    }

    handleKeyPress(e) {
        switch (e.key) {
            case 'ArrowUp':
                this.currentRow = Math.max(0, this.currentRow - 1);
                break;
            case 'ArrowDown':
                this.currentRow = Math.min(3, this.currentRow + 1);
                break;
            case 'ArrowLeft':
                this.currentCol = Math.max(0, this.currentCol - 1);
                break;
            case 'ArrowRight':
                this.currentCol = Math.min(2, this.currentCol + 1);
                break;
            case 'Enter':
                this.handleInput();
                break;
        }
        this.updateSelection();
    }

    handleInput() {
        const selectedKey = this.keys[this.currentRow * 3 + this.currentCol];
        const value = selectedKey.dataset.value;

        if (value === 'clear') {
            this.password = '';
            this.updateDisplay();
        } else if (value === 'enter') {
            if (this.password.length === 4) {
                this.submitPassword();
            }
        } else if (this.password.length < 4) {
            this.password += value;
            this.updateDisplay(value);
        }
    }

    // Resets the display that shows the password written
    async updateDisplay(newDigit = null) {
        const digits = document.querySelectorAll('.digit');

        if (newDigit !== null) {
            // Show the actual number first
            digits[this.password.length - 1].textContent = newDigit;

            // Wait 500ms then replace with asterisk
            await new Promise(resolve => setTimeout(resolve, 500));
        }

        digits.forEach((digit, index) => {
            if (index < this.password.length) {
                digit.textContent = '*';
                digit.classList.add('filled');
            } else {
                digit.textContent = '_';
                digit.classList.remove('filled');
            }
        });
    }

    submitPassword() {
        if (this.password === this.correctPassword) {
            console.log('Correct password entered');
            this.removeEventListeners(); // Remove event listeners
            // Dispatch custom event to notify that the correct password was entered
            const event = new CustomEvent('passwordCorrect');
            document.dispatchEvent(event);

            if (this.resolve) this.resolve();
        } else {
            this.errorSound.currentTime = 0;  // Reset audio to start
            this.errorSound.play().catch(e => console.error("Error playing error sound:", e));
            this.password = '';
            this.updateDisplay();
        }
    }

    removeEventListeners() {
        document.removeEventListener('keydown', this.handleKeyPressBound);
        this.keys.forEach(key => {
            key.replaceWith(key.cloneNode(true)); // Remove all event listeners from keys
        });
    }

    waitForCorrectPassword() {
        return new Promise((resolve) => {
            this.resolve = resolve;
        });
    }
}

export default PasswordKeypad;
