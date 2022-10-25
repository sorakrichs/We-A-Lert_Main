import {PermissionsAndroid,Platform} from "react-native";

const writeExternalPermissionController = async () => {
  try {

    if (Platform.OS === 'android' && Platform.Version < 23) {
      return true;
    }

    const granted = await PermissionsAndroid.request(
      PermissionsAndroid.PERMISSIONS.WRITE_EXTERNAL_STORAGE,
      {
        title: "Cool Photo App Camera Permission",
        message:
          "Cool Photo App needs access to your camera " +
          "so you can take awesome pictures.",
        buttonNeutral: "Ask Me Later",
        buttonNegative: "Cancel",
        buttonPositive: "OK"
      }
    );

    if (granted === PermissionsAndroid.RESULTS.GRANTED) {
      console.log("You can use the camera");
      return true;
    } else {
      console.log("Camera permission denied");
    }

    return false;

  } catch (err) {
    console.warn(err);
    return false;
  }
};

module.exports = writeExternalPermissionController