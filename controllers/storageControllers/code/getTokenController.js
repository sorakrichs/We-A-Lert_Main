import AsyncStorage from '@react-native-async-storage/async-storage';


const getTokenController = async () => {

  try {
    

    let token = await AsyncStorage.getItem('@token');
    return (token) ? token : null;

  } catch (err) {

    throw err
  }

}

module.exports = getTokenController;