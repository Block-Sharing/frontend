import * as config from '../config';

export default class PersonService {

    setPerson(data) {
        return fetch(config.BASE_URI + '/persons', {
            method: 'POST',
            headers: new Headers({
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            }),
            cache: 'no-cache',
            body: JSON.stringify(data)
        });
    }

}