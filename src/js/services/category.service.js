import * as config from '../config';

export default class CategoryService {

    getCategories() {
        return fetch(config.BASE_URI + '/categories', {
            method: 'GET',
            headers: new Headers({
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            })
        }).then(res => res.json());
    }

}