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
        this.PersonService.set({ nickname: 'icepick', floor: 'EG' }).then((result) => {
            console.log(result);
            localStorage.setItem('user-id', 'yolo');
            window.location.href = '/';
        })
    }
}