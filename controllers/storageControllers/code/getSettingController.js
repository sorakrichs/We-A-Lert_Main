import AsyncStorage from '@react-native-async-storage/async-storage';


const getSettingController = async (session_id: String) => {
  try {

    let pin = (session_id) ? await AsyncStorage.getItem(`@setting/${session_id}`) : await AsyncStorage.getItem(`@setting/guest`);
    return (pin) ? JSON.parse(pin) : null;

  } catch (err) {

    throw err

  }

}

module.exports = getSettingController;