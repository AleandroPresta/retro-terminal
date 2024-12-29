import Menu from './menu/menu.js';
import PasswordKeypad from './password/password.js';

let component_to_show = 'password';

document.addEventListener('DOMContentLoaded', async () => {
    const appContainer = document.getElementById('app');

    if (component_to_show === 'menu') {
        const menu = new Menu(appContainer);
        await menu.initialize();
    }

    if (component_to_show === 'password') {
        const keypad = new PasswordKeypad(appContainer);
        await keypad.initialize();
    }
});
