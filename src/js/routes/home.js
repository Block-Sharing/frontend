import Handlebars from 'handlebars';

export default class HomeRoute  {
    render() {
        fetch('templates/home.hbs')
            .then(res => res.text())
            .then((source) => {
                let template = Handlebars.compile(source);

                document.getElementById('app-outlet').innerHTML = template();
            });
    }
}