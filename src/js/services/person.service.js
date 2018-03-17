import * as config from '../config';

export default class PersonService {

    /**
     * Save user nickname & floor
     *
     * import PersonService  from '../services/person.service';
     * new PersonService().set({ nickname: 'icepick', floor; 'EG' });
     */
    setPerson(data) {
        return fetch(config.BASE_URI + '/persons', {
            method: 'POST',
            headers: new Headers({
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            }),
            body: JSON.stringify(data)
        }).then(res => res.json());
    }
}