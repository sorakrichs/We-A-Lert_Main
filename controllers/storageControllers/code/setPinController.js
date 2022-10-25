import AsyncStorage from '@react-native-async-storage/async-storage';


const pinStorageController = async (data: Map,session_id: String) => {
  try {

    const jsonValue = JSON.stringify([...data.entries()].filter((value) => {

      if((value[1].type == 'mypin' || value[1].type == 'report') && new Date(value[1]?.date) > new Date()){
          return true;
      }
      else 
          return false;

    }));
    if(session_id)
      await AsyncStorage.setItem(`@pin/${session_id}`, jsonValue);
    else
      await AsyncStorage.setItem(`@pin/guest`, jsonValue);

  } catch (err) {

    throw err

  }

}

module.exports = pinStorageController;