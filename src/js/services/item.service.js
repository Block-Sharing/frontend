import * as config from '../config';

export default class ItemService {

    getAllItems(houseHash) {
        const houseHash = '1337'; // Currently there is only one house available
        return fetch(config.BASE_URI + `/houses/${houseHash}/items`, {
            method: 'GET',
            headers: new Headers({
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            }),
            cache: 'no-cache',
        }).then(res => res.json());
    }

    addItem(houseHash, userHash, data) {
        const houseHash = '1337'; // Currently there is only one house available
        return fetch(config.BASE_URI + `/houses/${houseHash}/items`, {
            method: 'POST',
            headers: new Headers({
                'X-UserHash': userHash,
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            }),
            cache: 'no-cache',
            body: JSON.stringify(data)
        });
    }

}