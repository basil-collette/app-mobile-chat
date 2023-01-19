import * as StoreService from '@services/StoreService';
import { ENDPOINT_API } from '@env'

const httpRequest = async (endpoint, method, headers, body) => {

    let requestOptions = {
        method: method,
        headers: { 'Content-Type': 'application/json' }
    };

    if(headers) {
        Object.assign(requestOptions.headers, headers);
    }

    if (!requestOptions.headers['Authorization']) {
        const bearerToken = await StoreService.retrieveData('jwttoken');
        if(bearerToken) {
            Object.assign(requestOptions.headers, { 'Authorization': 'Bearer ' + bearerToken });
        }
    }

    if(body) {
        requestOptions.body = JSON.stringify(body);
    }

    try {
        const response = await fetch(ENDPOINT_API + endpoint, requestOptions);
        return await response.json();
    } catch(err) {
        console.error(err);
        throw new Error(err);
    }
    
}

module.exports = {
    httpRequest
};