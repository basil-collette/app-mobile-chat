import * as SecureStore from 'expo-secure-store';

const storeData = async (key, value) => {
    try {
        SecureStore.setItemAsync(key, value);
    } catch (e) {
        // saving error
    }
}

const retrieveData = async (key) => {
    try {
        const result = await SecureStore.getItemAsync(key);
        if(value !== null) {
          // value previously stored
        }
    } catch(err) {
        console.error();
    }
};

module.exports = {
    storeData,
    retrieveData
}