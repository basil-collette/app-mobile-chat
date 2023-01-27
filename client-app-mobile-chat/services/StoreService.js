import * as SecureStore from 'expo-secure-store';

const storeData = async (key, value) => {
    try {
        if (typeof value !== 'string') {
            value = JSON.stringify(value);
        }
        return await SecureStore.setItemAsync(key, value);
    } catch (err) {
        throw new Error(err);
        
    }
}

const retrieveData = async (key) => {
    try {
        return await SecureStore.getItemAsync(key);
    } catch(err) {
        console.error(err);
    }
};

const deleteData= async (key) => {
    try {
        return await SecureStore.deleteItemAsync(key);
    } catch (error) {
        console.error(err);
    }
  };

module.exports = {
    storeData,
    retrieveData,
    deleteData
}