import Handlebars from "handlebars";

export default class AddRoute {
    render() {
        fetch('templates/add.hbs')
            .then(res => res.text())
            .then((source) => {
                let template = Handlebars.compile(source);

                document.getElementById('app-outlet').innerHTML = template();
            });
    }
}