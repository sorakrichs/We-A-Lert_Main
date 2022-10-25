import React, {createContext,useContext,useState,useEffect,useRef,useCallback} from 'react'
import {sendUserLocation} from '../controllers/notificationControllers'
import Geolocation from 'react-native-geolocation-service';
import { useAuth } from './AuthProvider';
import { useMap } from './MapProvider';
import { useAlert } from './AlertProvider';
import {locationPermission} from '../controllers/permissionControllers'
import error_localization from '../data/error_localization.json'

const TrackingContext = createContext({})
const useTracking = () => {
    const tracking = useContext(TrackingContext)
    if(tracking == null) {throw new Error ('useTracking() must call inside AuthProvider')}
    return tracking;
}

const usePrevious = (value) => {
  const ref = useRef();
  useEffect(() => {
    ref.current = value;
  });
  return ref.current;
}

const TrackingProvider = ({children}) => {


    const [currentLocation,setCurrentLocation] = useState({lat:null,lon:null});
    const prevLocation = usePrevious(currentLocation);
    const [observing,setObserving] = useState(false);
    const watchId = useRef(null);
    const {session} = useAuth();
    const {setYourLocationPin} = useMap();
    const {willAlert} = useAlert();


    useEffect(() => {

        let process = true;
        load()
        return () => {process = false}

        async function load(){
            if(process && prevLocation && (prevLocation.lat != currentLocation.lat || prevLocation.lon != currentLocation.lon)) {
                await sendUserLocation(session.id,currentLocation)
                .catch(err => {
                    removeLocationUpdates();
                    willAlert('ระบบขัดข้อง',(err?.response?.data?.message) ? err?.response?.data?.message : err?.message);
                });
            }
        }

    },[currentLocation,session])


    const getInitialNotification = async () => {

      const notification: Notification = await Notifications.getInitialNotification();
      if(notification)
        notificationAlert(notification.payload)

    }


    const removeLocationUpdates = useCallback(() => {
        if (watchId.current !== null) {
            Geolocation.clearWatch(watchId.current);
            watchId.current = null;
            setObserving(false);
        }
    }, []);


    const getCurrentLocation = async () => {
        if (await locationPermission()) {
        Geolocation.getCurrentPosition(
            async position => {
                updateLocation(position);
            },
            error => {
                willAlert('ระบบขัดข้อง',(error?.response?.data?.message) ? error?.response?.data?.message : error?.message);
            },
            {enableHighAccuracy: true, timeout: 15000, maximumAge: 10000},
        );
        }
    }



    const updateLocation = async (position) => {
        try {
            let location = {
                lat: position.coords.latitude,
                lon: position.coords.longitude,
                //lat: 13.647085506732324,
                //lon: 100.45092393573889,
            };

            setCurrentLocation(location);
            setYourLocationPin(location);
            

        } catch(err) {

            watchId.current = null;
            Geolocation.stopObserving();
            willAlert('ระบบขัดข้อง',(err?.response?.data?.message) ? err?.response?.data?.message : err?.message);
        }
    }

    const getLocationUpdates = async () => {

        const hasPermission = await locationPermission();

        if (!hasPermission) {
        return;
        }
        
        setObserving(true);

        watchId.current = Geolocation.watchPosition(
        position => {

            updateLocation(position);

        },
        error => {

            setCurrentLocation({lat:null,lon:null});
            willAlert('เกิดปัญหาขึ้น',error.message);

        },
        {
            accuracy: {
            android: 'high',
            ios: 'best',
            },
            distanceFilter: 0,
            interval: 10000,
            fastestInterval: 5000,
        },
        );
    };


    return (
        <TrackingContext.Provider
          value={{
            currentLocation,
            observing,
            getCurrentLocation,
            setObserving,
            getLocationUpdates,
            removeLocationUpdates
          }}
        >
            {children}
        </TrackingContext.Provider>
      );


}



export { TrackingProvider, useTracking };