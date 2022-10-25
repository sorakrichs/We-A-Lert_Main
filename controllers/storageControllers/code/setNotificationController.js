import AsyncStorage from '@react-native-async-storage/async-storage';


const notificationStorageController = async (data: Array,session_id: String) => {
    try {
      const jsonValue = JSON.stringify(data);
      
      if(session_id)
        await AsyncStorage.setItem(`@notification/${session_id}`, jsonValue);
      else
        await AsyncStorage.setItem(`@notification/guest`, jsonValue);
  
    } catch (err) {
  
      throw err
  
    }
  
  }
  
  module.exports = notificationStorageController;