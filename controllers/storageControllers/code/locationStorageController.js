import AsyncStorage from '@react-native-async-storage/async-storage';


const locationStorageController = async (data: { lon: Number,lat: Number}) => {
  try {

    const jsonValue = JSON.stringify(data);
    await AsyncStorage.setItem('@location', data)

  } catch (err) {

    throw err;
  }

}

module.exports = locationStorageController;