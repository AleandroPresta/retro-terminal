class Menu {
    constructor(container) {
        this.container = container;
        this.options = null;
        this.selectedIndex = 0;
    }

    async initialize() {
        const response = await fetch('/src/menu/menu.html');
        const html = await response.text();
        this.container.innerHTML = html;

        this.options = this.container.querySelectorAll('.option');
        this.setupEventListeners();
        this.updateSelection();
    }

    setupEventListeners() {
        document.addEventListener('keydown', (e) => this.handleKeyPress(e));
    }

    handleKeyPress(e) {
        switch (e.key) {
            case 'ArrowUp':
                e.preventDefault();
                this.selectedIndex = (this.selectedIndex - 1 + this.options.length) % this.options.length;
                this.updateSelection();
                break;
            case 'ArrowDown':
                e.preventDefault();
                this.selectedIndex = (this.selectedIndex + 1) % this.options.length;
                this.updateSelection();
                break;
        }
    }

    updateSelection() {
        this.options.forEach(option => option.classList.remove('selected'));
        this.options[this.selectedIndex].classList.add('selected');
    }
}

export default Menu;
