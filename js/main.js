import Menu from './menu/menu.js';
import keypad from './password/password.js';

document.addEventListener('DOMContentLoaded', async () => {
    await keypad.waitForCorrectPassword();
    const appContainer = document.getElementById('app');
    const menu = new Menu(appContainer);
    await menu.initialize();
});
