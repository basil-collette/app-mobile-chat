const request = async (endpoint, post, endProcess, headers, body) => {

    let requestOptions = {
        method: (post == true) ? 'POST' : 'GET',
        headers: { 'Content-Type': 'application/json' }
    };

    if(headers) {
        Object.assign(requestOptions.headers, headers);
        console.log(requestOptions.headers);
    }

    if(body) {
        requestOptions.body = JSON.stringify(body)
    }

    const response = await fetch(endpoint, requestOptions);
    const data = await response.json();

    if (endProcess) endProcess(data);
}

module.exports = {
    request
};