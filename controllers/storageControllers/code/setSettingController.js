import AsyncStorage from '@react-native-async-storage/async-storage';


const setSettingController = async (data: Object,session_id: String) => {
  try {

    const jsonValue = JSON.stringify(data);
    if(session_id)
      await AsyncStorage.setItem(`@setting/${session_id}`, jsonValue);
    else
      await AsyncStorage.setItem(`@setting/guest`, jsonValue);


  } catch (err) {

    throw err

  }

}

module.exports = setSettingController;