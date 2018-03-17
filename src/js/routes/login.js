import Handlebars from 'handlebars';

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
        localStorage.setItem('user-id', 'yolo');
        window.location.href = '/';
    }
}