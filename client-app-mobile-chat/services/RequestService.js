import { ENDPOINT_API } from '@env'

const request = async (endpoint, post, headers, body) => {

    let requestOptions = {
        method: (post == true) ? 'POST' : 'GET',
        headers: { 'Content-Type': 'application/json' }
    };

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
    request
};