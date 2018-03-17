import * as config from '../config';

export default class HouseService {

    getHouse(hash) {
        const hash = '1337'; // Currently there is only one house available
        return fetch(config.BASE_URI + `/houses/${hash}`, {
            method: 'GET',
        }).then(res => res.json());
    }

}