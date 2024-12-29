import Menu from './menu/menu.js';

document.addEventListener('DOMContentLoaded', async () => {
    const appContainer = document.getElementById('app');
    const menu = new Menu(appContainer);
    await menu.initialize();
});
