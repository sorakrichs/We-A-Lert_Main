import AsyncStorage from '@react-native-async-storage/async-storage';


const getPinController = async (session_id: String) => {
  try {

    let pin = (session_id) ? await AsyncStorage.getItem(`@pin/${session_id}`) : await AsyncStorage.getItem(`@pin/guest`);
    return (pin) ? JSON.parse(pin) : null;

  } catch (err) {

    throw err

  }

}

module.exports = getPinController;