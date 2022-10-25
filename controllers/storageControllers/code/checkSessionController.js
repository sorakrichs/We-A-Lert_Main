import AsyncStorage from '@react-native-async-storage/async-storage';


const checkSessionController = async () => {

  const jwtDecode = require('jwt-decode');

  try {
    

    let token = await AsyncStorage.getItem('@token');
    return (token) ? jwtDecode(token) : null;

  } catch (err) {

    throw err;
  }

}

module.exports = checkSessionController;