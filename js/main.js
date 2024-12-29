document.addEventListener('DOMContentLoaded', () => {
    const options = document.querySelectorAll('.option');
    let selectedIndex = 0;

    function updateSelection() {
        options.forEach(option => option.classList.remove('selected'));
        options[selectedIndex].classList.add('selected');
    }

    document.addEventListener('keydown', (e) => {
        switch (e.key) {
            case 'ArrowUp':
                e.preventDefault();
                selectedIndex = (selectedIndex - 1 + options.length) % options.length;
                updateSelection();
                break;
            case 'ArrowDown':
                e.preventDefault();
                selectedIndex = (selectedIndex + 1) % options.length;
                updateSelection();
                break;
        }
    });

    // Initialize first selection
    updateSelection();
});
