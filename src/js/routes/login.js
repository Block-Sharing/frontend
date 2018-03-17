import Handlebars from 'handlebars';
import PersonService from '../services/person.service';

export default class LoginRoute  {
    constructor() {
        this.addEvents = this.addEvents.bind(this);
        this.onSignInClicked = this.onSignInClicked.bind(this);
    }

    render() {
        fetch('templates/login.hbs')
            .then(res => res.text())
            .then((source) => {
                let template = Handlebars.compile(source);
                document.getElementById('app-outlet').innerHTML = template();

                this.addEvents();
            });
    }

    addEvents() {
        document.getElementById('btn-sign-in').addEventListener('click', this.onSignInClicked)
    }

    onSignInClicked() {
        new PersonService().setPerson({ "nickname": "icepick", "floor": "EG" }).then((result) => {
            localStorage.setItem('user-id', result.hash);
            window.location.href = '/';
        })
    }
}