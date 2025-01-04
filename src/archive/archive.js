// Initialize the first message on page load
document.addEventListener('DOMContentLoaded', () => {
    showMessage(0);
});

document.addEventListener('keydown', function (event) {
    if (event.key === 'ArrowUp' || event.key === 'ArrowDown') {
        event.preventDefault(); // Prevent default scrolling behavior
        const selected = document.querySelector('.option.selected');
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
            showMessage(index);
        }
    }
});

function showMessage(index) {
    const messages = document.querySelectorAll('.message');
    messages.forEach((message, i) => {
        message.style.display = i === index ? 'block' : 'none';
    });
    const options = document.querySelectorAll('.option');
    options.forEach((option, i) => {
        option.classList.toggle('selected', i === index);
    });
}

// Add clock functionality
function updateClock() {
    const now = new Date();
    const time = now.toTimeString().split(' ')[0];
    document.querySelector('.clock').textContent = time;
}

// Update clock every second
setInterval(updateClock, 1000);
updateClock(); // Initial call
