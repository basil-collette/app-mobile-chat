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

    if(body) {
        requestOptions.body = JSON.stringify(body);
    }

    const response = await fetch(endpoint, requestOptions);
    if (!response.ok) {
        const textError = await response.text();
        throw new Error(textError);
    }

    return await response.json();
}

const apiHttpRequest = async (endpoint, method, headers, body) => {
    if (!headers) {
        headers = {};
    }

    if(!headers['Authorization']) {
        const bearerToken = await StoreService.retrieveData('jwttoken');
        
        if(bearerToken) {
            Object.assign(headers, { 'Authorization': 'Bearer ' + bearerToken });
        }
    }
    
    return await httpRequest(ENDPOINT_API + endpoint, method, headers, body);
}

module.exports = {
    httpRequest,
    apiHttpRequest
};