import * as SecureStore from 'expo-secure-store';

const storeData = async (key, value) => {
    try {
        if (typeof value !== 'string') {
            value = JSON.stringify(value);
        }
        return await SecureStore.setItemAsync(key, value);
    } catch (err) {
        console.error(err);
    }
}

const retrieveData = async (key) => {
    try {
        return await SecureStore.getItemAsync(key);
    } catch(err) {
        console.error(err);
    }
};

module.exports = {
    storeData,
    retrieveData
}