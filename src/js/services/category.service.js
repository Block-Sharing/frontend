import * as config from '../config';

export default class CategoryService {

    getCategories() {
        return fetch(config.BASE_URI + '/categories', {
            method: 'GET',
            headers: new Headers({
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            }),
            body: JSON.stringify(data)
        }).then(res => res.json());
    }

}