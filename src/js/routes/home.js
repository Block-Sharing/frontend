import Handlebars from 'handlebars';

export default class HomeRoute  {
    render() {
        let source   = '<div>{{test}}xxxx</div>';
        let template = Handlebars.compile(source);

        document.getElementById('app-outlet').innerHTML = template();
    }
}