import Menu from './menu/menu.js';
import PasswordKeypad from './password/password.js';
import LoadingComponent from './loading/loading.js';

let componentToShow = 'loading';
let successSound = document.getElementById('success-sound');

document.addEventListener('DOMContentLoaded', async () => {
    const appContainer = document.getElementById('app');

    if (componentToShow === 'loading') {
        const loading = new LoadingComponent(appContainer);
        await loading.initialize();
        // Listen for the custom event
        document.addEventListener('loadingFinished', () => {
            console.log("Loading finished");
            componentToShow = 'password';
            const keypad = new PasswordKeypad(appContainer);
            keypad.initialize();
        });
    }

    if (componentToShow === 'password') {
        const keypad = new PasswordKeypad(appContainer);
        await keypad.initialize();
    }

    // Listen for the custom event to change the componentToShow variable
    document.addEventListener('passwordCorrect', async () => {
        componentToShow = 'menu';

        // Play success sound
        successSound.currentTime = 0;  // Reset audio to start
        successSound.play().catch(e => console.error("Error playing success sound:", e));

        const menu = new Menu(appContainer);
        await menu.initialize();
    });
});
