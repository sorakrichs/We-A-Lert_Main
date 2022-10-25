import AsyncStorage from '@react-native-async-storage/async-storage';


const getNotificationController = async (session_id: String) => {
  try {

    let pin = (session_id) ? await AsyncStorage.getItem(`@notification/${session_id}`) : await AsyncStorage.getItem(`@notification/guest`);
    return (pin) ? JSON.parse(pin) : null;

  } catch (err) {

    throw err

  }

}

module.exports = getNotificationController;