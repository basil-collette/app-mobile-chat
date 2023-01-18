import * as SecureStore from 'expo-secure-store';

const storeData = async (key, value) => {
    try {
        if (typeof str !== 'string') {
            value = JSON.stringify(value);
        }
        return await SecureStore.setItemAsync(key, value);
    } catch (err) {
        console.error(err);
    }
}

const retrieveData = async (key) => {
    try {
        const result = await SecureStore.getItemAsync(key);
        return await JSON.parse(result);
    } catch(err) {
        console.error(err);
    }
};

module.exports = {
    storeData,
    retrieveData
}