import * as StoreService from './StoreService';
import { ENDPOINT_API } from '@env'

const httpRequest = async (endpoint, post, headers, body) => {

    let requestOptions = {
        method: (post == true) ? 'POST' : 'GET',
        headers: { 'Content-Type': 'application/json' }
    };

    const bearerToken = await StoreService.retrieveData('jwttoken');
    if(bearerToken) {
        Object.assign(requestOptions.headers, { 'Authorization': 'Bearer ' + bearerToken });
    }

    if(headers) {
        Object.assign(requestOptions.headers, headers);
    }

    if(body) {
        requestOptions.body = JSON.stringify(body);
    }

    const response = await fetch(ENDPOINT_API + endpoint, requestOptions);
    return await response.json();
}

module.exports = {
    httpRequest
};