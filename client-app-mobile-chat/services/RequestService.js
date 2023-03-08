import * as StoreService from '@services/StoreService';
import { ENDPOINT_API } from '@env';
import ChappyError from '@error/ChappyError';

const httpRequest = async (endpoint, method, headers, body, needLoader = false) => {
    try {
        let requestOptions = {
            method: method,
            headers: { 'Content-Type': 'application/json', 'X-Chappy-NeedLoader' : needLoader }
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
            throw new ChappyError(textError, false, "RequestService.httpRequest : if(!response.ok)");
        }
    
        return await response.json();

    } catch (err) {
        if (!(err instanceof ChappyError)) err = new ChappyError(err.message, false, "RequestService.httpRequest");
        throw err;
    }
}

const apiHttpRequest = async (endpoint, method, headers, body, needLoader = false) => {
    if (!headers) {
        headers = {};
    }

    if(!headers['Authorization']) {
        const bearerToken = await StoreService.retrieveData('jwttoken');
        
        if(bearerToken) {
            Object.assign(headers, { 'Authorization': 'Bearer ' + bearerToken });
        }
    }
    
    return await httpRequest(ENDPOINT_API + endpoint, method, headers, body, needLoader);
}

module.exports = {
    httpRequest,
    apiHttpRequest
};