import Router from 'es6-client-side-router';

import AddRoute from './routes/add';
import SearchRoute from './routes/search';
import HomeRoute from './routes/home';
import LoginRoute from './routes/login';

document.addEventListener('DOMContentLoaded', () => {
    const router = new Router();
    let module;

    router.on('/add', (ctx) => {
        console.log('add');

        const add = new AddRoute().render();
    });

    router.on('/search', (ctx) => {
        console.log('search');

        const search = new SearchRoute().render();
    });

    router.on('/login', (ctx) => {
        console.log('login');

        const search = new LoginRoute().render();
    });

    router.on('router-no-match', (ctx) => {
        console.log('No route matched');

        const home = new HomeRoute().render();
    });

    router.enable();
});