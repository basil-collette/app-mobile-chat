const StoreService = require('./StoreService');

const httpRequest = async (endpoint, method, headers, body) => {

    let requestOptions = {
        method: method,
        headers: { 'Content-Type': 'application/json' },
        origin: "*"
    };

    if (headers) {
        Object.assign(requestOptions.headers, headers);
    }

    if (body) {
        requestOptions.body = JSON.stringify(body);
    }
    const response = await fetch(endpoint, requestOptions);
    if (!response.ok) {
        const textError = await JSON.parse(await response.text());
        throw new Error(textError.message);
    }
    let result = await response.text();

    try {
        result = await JSON.parse(result);
    } catch (err) {
    }

    return result;
}

const apiHttpRequest = async (endpoint, method, headers, body) => {
    if (!headers) {
        headers = {};
    }

    if (!headers['Authorization']) {
        const bearerToken = StoreService.retrieveData('jwttoken');

        if (bearerToken) {
            Object.assign(headers, { 'Authorization': 'Bearer ' + bearerToken });
        }
    }

    return await httpRequest("http://localhost:3000/" + endpoint, method, headers, body);
}




module.exports = {
    httpRequest,
    apiHttpRequest
};