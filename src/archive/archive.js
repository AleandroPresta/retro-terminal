class Archive {
    constructor(container) {
        this.container = container;
    }

    async initialize() {
        const response = await fetch('src/archive/archive.html');
        const html = await response.text();
        this.container.innerHTML = html;
        this.setupEventListeners();
        this.updateClock(); // Initial call
        setInterval(() => this.updateClock(), 1000); // Update clock every second
    }

    updateClock() {
        const now = new Date();
        const hours = String(now.getHours()).padStart(2, '0');
        const minutes = String(now.getMinutes()).padStart(2, '0');
        const seconds = String(now.getSeconds()).padStart(2, '0');
        const time = `${hours}:${minutes}:${seconds}`;
        document.querySelector('.clock').textContent = time;
    }

    setupEventListeners() {
        document.addEventListener('keydown', (event) => this.handleKeyPress(event));
    }

    // Add a method to handle key presses
    handleKeyPress(event) {
        if (event.key === 'ArrowUp' || event.key === 'ArrowDown') {
            event.preventDefault(); // Prevent default scrolling behavior
            const selected = document.querySelector('.archive-option.selected');
            let newSelected;
            if (event.key === 'ArrowUp') {
                newSelected = selected.previousElementSibling;
            } else if (event.key === 'ArrowDown') {
                newSelected = selected.nextElementSibling;
            }
            if (newSelected) {
                selected.classList.remove('selected');
                newSelected.classList.add('selected');
                const index = Array.from(newSelected.parentNode.children).indexOf(newSelected);
                this.showMessage(index);
            }
        }
    }

    showMessage(index) {
        const messages = document.querySelectorAll('.message');
        messages.forEach((message, i) => {
            message.style.display = i === index ? 'block' : 'none';
        });
        const options = document.querySelectorAll('.archive-option');
        options.forEach((option, i) => {
            option.classList.toggle('selected', i === index);
        });
    }
}

export default Archive;