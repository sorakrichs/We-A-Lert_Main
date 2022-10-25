import AsyncStorage from '@react-native-async-storage/async-storage';


const removeSessionController = async () => {
  try {

    await AsyncStorage.removeItem('@token');

  } catch (err) {

    throw err;
    
  }

}

module.exports = removeSessionController;