import AsyncStorage from '@react-native-async-storage/async-storage';


const sessionStorageController = async (value) => {
  try {

    await AsyncStorage.setItem('@token', value)

  } catch (err) {

    throw err;
  }

}

module.exports = sessionStorageController;