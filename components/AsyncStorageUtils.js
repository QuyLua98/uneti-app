import {AsyncStorage} from 'react-native';

export const _storeAsyncStorageData = async (key, value) => {
    try {
        await AsyncStorage.setItem(key, value);
    } catch (error) {
        console.log("Store to AsyncStorage fail:" + error);
    }
};

export const _retrieveAsyncStorageData = async (key) => {
    try {
        const value = await AsyncStorage.getItem(key);
        if (value !== null) {
            return value;
        } else {
            return null;
        }
    } catch (error) {
        console.log("Fail to get AsyncStorage: " + error);
        return null;
    }
};


export const _removeAsyncStorageData = async (key) => {
    try {
        await AsyncStorage.removeItem(key);
    } catch (error) {
        console.log("Remove " + key + " in AsyncStorage fail:" + error);
    }
};