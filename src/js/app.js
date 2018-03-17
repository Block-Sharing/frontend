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

        if (localStorage.getItem('user-id')) {
            const add = new AddRoute().render();
        } else {
            window.location.href = '/login';
        }
    });

    router.on('/search', (ctx) => {
        console.log('search');

        if (localStorage.getItem('user-id')) {
            const search = new SearchRoute().render();
        } else {
            window.location.href = '/login';
        }
    });

    router.on('/login', (ctx) => {
        console.log('login');

        if (localStorage.getItem('user-id')) {
            const home = new HomeRoute().render();
        } else {
            window.location.href = '/login';
        }

    });

    router.on('router-no-match', (ctx) => {
        if (localStorage.getItem('user-id')) {
            const home = new HomeRoute().render();
        } else {
            window.location.href = '/login';
        }
    });

    router.enable();
});