class PasswordKeypad {
    constructor(container) {
        this.container = container;
    }

    async initialize() {
        const response = await fetch('/src/password/password.html');
        const html = await response.text();
        this.container.innerHTML = html;

        this.currentRow = 0;
        this.currentCol = 0;
        this.password = '';
        this.keys = document.querySelectorAll('.key');
        this.digits = document.querySelectorAll('.digit');
        this.correctPassword = '1996';
        this.successSound = document.getElementById('success-sound');
        this.errorSound = document.getElementById('error-sound');
        this.updateSelection();
        document.addEventListener('keydown', (e) => this.handleKeyPress(e));
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
            this.successSound.currentTime = 0;  // Reset audio to start
            this.successSound.play().catch(e => console.error("Error playing success sound:", e));
            // Hide the terminal and resolve the promise
            document.getElementById('terminal').style.display = 'none';
            document.getElementById('app').style.display = 'block';  // Show the app div
            if (this.resolve) this.resolve();
        } else {
            this.errorSound.currentTime = 0;  // Reset audio to start
            this.errorSound.play().catch(e => console.error("Error playing error sound:", e));
            this.password = '';
            this.updateDisplay();
        }
    }

    waitForCorrectPassword() {
        return new Promise((resolve) => {
            this.resolve = resolve;
        });
    }
}

export default PasswordKeypad;
