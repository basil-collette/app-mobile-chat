import * as StoreService from '@services/StoreService';
import { ENDPOINT_API } from '@env'

const httpRequest = async (endpoint, headers, body) => {
    let requestOptions = {
        method: (body) ? 'POST' : 'GET',
        headers: { 'Content-Type': 'application/json' }
    };

    if(headers) {
        Object.assign(requestOptions.headers, headers);
    }

    if(body) {
        requestOptions.body = JSON.stringify(body);
    }

    try {
        const response = await fetch(endpoint, requestOptions);
        return await response.json();
    } catch(err) {
        console.error(err);
        throw new Error(err);
    }
}

const apiHttpRequest = async (endpoint, headers, body) => {
    if (!headers) {
        headers = {};
    }

    if(!headers['Authorization']) {
        const bearerToken = await StoreService.retrieveData('jwttoken');
        
        if(bearerToken) {
            Object.assign(headers, { 'Authorization': 'Bearer ' + bearerToken });
        }
    }

    return await httpRequest(ENDPOINT_API + endpoint, headers, body);
}

module.exports = {
    httpRequest,
    apiHttpRequest
};