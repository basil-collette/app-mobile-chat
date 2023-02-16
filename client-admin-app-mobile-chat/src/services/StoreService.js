const storeData =(key, value) => {
    try {
        if (typeof value !== 'string') {
            value = JSON.stringify(value);
        }
        return sessionStorage.setItem(key, value);
    } catch (err) {
        console.error(err);
    }
}

const retrieveData = (key) => {
    try {
        return sessionStorage.getItem(key);
    } catch(err) {
        console.error(err);
    }
};

const forgetData=  (key) => {
    try {
    return sessionStorage.removeItem(key)
    } catch (err) {
        console.error(err);
    }
  };



module.exports = {
    storeData,
    retrieveData,
    forgetData
}

