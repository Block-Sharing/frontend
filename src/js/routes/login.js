import Handlebars from 'handlebars';

export default class LoginRoute  {
    render() {
        fetch('templates/login.hbs')
            .then(res => res.text())
            .then((source) => {
                let template = Handlebars.compile(source);

                document.getElementById('app-outlet').innerHTML = template();
            });
    }
}