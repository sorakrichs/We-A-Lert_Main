import React, {createContext,useContext,useState,useMemo,useRef,useEffect} from 'react'
import {memberRegister,userNotification} from '../controllers/userControllers'
import {sendToken,sendUserLocation} from '../controllers/notificationControllers'
import Geolocation from 'react-native-geolocation-service';
import { Notifications } from 'react-native-notifications';
import AlertModal from '../componant/misc/AlertModal'
import { useAuth } from './AuthProvider';
import { useMap } from './MapProvider';
import {locationPermission} from '../controllers/permissionControllers'
import error_localization from '../data/error_localization.json'
import notification_localization from '../data/notification_localization.json'
import { setNotification,getNotification } from '../controllers/storageControllers';
import {AppState} from 'react-native'

const AlertContext = createContext({})
const useAlert = () => {
    const alert = useContext(AlertContext)
    if(alert == null) {throw new Error ('useAuth() must call inside AuthProvider')}
    return alert;
}


const AlertProvider = ({children}) => {


    const [alert,_setAlert] = useState({open:false,title:'',desc:'',type:'normal'});
    const [alertStack,setAlertStack] = useState([]);
    const alertRef = useRef(alert);
    const setAlert = data => {
      alertRef.current = data;
      _setAlert(data);
    };
    const [useFunction,setUseFunction] = useState({func:() => {}, param:[]});
    const {session,setting,sessionRef,setSession} = useAuth();
    const {setYourLocationPin,setNotiReportPin,volunteerAcceptReport,getValidateMarker,getReportMarker,setValidateMarker} = useMap();

    
    useEffect(() => {
      const appStateListener = AppState.addEventListener(
      'change',
          nextAppState => {

              if(nextAppState == 'background' && session.role){
                setNotification(alertStack,(session.role != 'guest') ? session.id : null);
              }
              
          },
      );
      return () => {
          appStateListener?.remove();
      };
    }, [alertStack]);

    const loadNotification = async (id) => {

        try {
    
            let data = await getNotification(id);
            if(data)
                setAlertStack(data)

            return data;


        } catch(err) {

            throw err;

        }

    }



    const reciveReport = async (location,description,report_user,images,report_id) => {
      try {
        
        if(!sessionRef.current.id) throw Error(`Error`);
        let key = await setNotiReportPin(location,description,report_user,images,report_id)
        if(key.length<=0) {
          await userNotification(report_user.id,{
            "title": "volunteer รับเรื่องแล้ว",
            "body": "กำลังไปที่หมาย",
            "type" : "recive_report",
            "volunteer_id" : sessionRef.current.id,
            "volunteer_name": sessionRef.current.username,
            "volunteer_phone": sessionRef.current.phone,
            "report_id" : report_id

          });
        }


      } catch (err) {

        willAlert('เกิดข้อผิดพลาดขึ้น',(err?.response?.data?.message) ? err?.response?.data?.message : err?.message);

      }


    }

    


    const notificationAlert = async (data) => {

        switch(data.type){
          case ('report') :
            willAlert(
              data["gcm.notification.title"],
              data["gcm.notification.body"], 
              async () => await reciveReport, 
              [JSON.parse(data.location),data["gcm.notification.body"],{id: data.userid, username: data.username,phone: data.phone},JSON.parse(data.imageUrl),data.id]
              ,'report')
          break;
          case ('recive_report') :
            willAlert(
              data["gcm.notification.title"],
              data["gcm.notification.body"],
              async () =>  await volunteerAcceptReport,
              [data.report_id,{id: data.volunteer_id,name: data.volunteer_name,phone: data.volunteer_phone}]);
          break;
          case ('isvalidated') :
            willAlert(
              data["gcm.notification.title"],
              data["gcm.notification.body"],
              async () =>  await getValidateMarker,
              [data.id]);
          break;
          case ('car') :
          case ('fire') :
          case ('epidemic') :
          case ('flood') :
          case ('earthquake') :
            willAlert(
              data["gcm.notification.title"],
              data["gcm.notification.body"],
              async () =>  await getReportMarker,
              [data.id],'gosee');
          break;
          default:
            willAlert(
              data.title,
              data.body);
          break;
        }

        setAlertStack((prev) => [{...data,time: new Date()},...prev])
      
    }


    const setupNotification = async (data) => {

      Notifications.registerRemoteNotifications();

    }

    const registerNotification = async () => {


      Notifications.events().registerNotificationReceivedForeground((notification: Notification, completion: (response: NotificationCompletion) => void) => {
        console.log("Notification Received - Foreground");
        notificationAlert(notification.payload);
        // Calling completion on iOS with `alert: true` will present the native iOS inApp notification.
        completion({alert: true, sound: true, badge: false});
      });

      Notifications.events().registerNotificationReceivedBackground((notification: Notification, completion: (response: NotificationCompletion) => void) => {
        if(setting.background_alert) {
          notificationAlert(notification.payload);
          console.log("Notification Received - Background");
          setAlertStack((prev) => [{...notification.payload,time: new Date()},...prev])
          // Calling completion on iOS with `alert: true` will present the native iOS inApp notification.
          completion({alert: true, sound: true, badge: false});
        }
      });  

      Notifications.events().registerRemoteNotificationsRegistered(async (event: Registered) => {
          
        if(event.deviceToken && sessionRef.current.role) 
        {   
          if(sessionRef.current.id) {
            await sendToken({userid: sessionRef.current.id,role:sessionRef.current.role,token:event.deviceToken})
            .catch( err => {
              willAlert('เกิดข้อผิดพลาดขึ้น',(err?.response?.data?.message) ? err?.response?.data?.message : err?.message);
            })
          } else {
            
            setSession({...session,id: event.deviceToken,role: 'guest'})
            await sendToken({userid:event.deviceToken,role:'guest',token:event.deviceToken})
            .catch( err => {
              willAlert('เกิดข้อผิดพลาดขึ้น',(err?.response?.data?.message) ? err?.response?.data?.message : err?.message);
            })
          }
        }

    });

    }

    const getInitialNotification = async () => {

      const notification: Notification = await Notifications.getInitialNotification();
      if(notification) 
        notificationAlert(notification.payload)
      

    }

    const closeAlert = () => {
      setAlert(prev => ({...prev,open: false,type: 'normal'}));
    }


    const willAlert = (title='',desc='',usedFunction=()=>{},param=null,type='normal') => {

      closeAlert();
      setTimeout(() => {  

        setUseFunction(prev => ({...prev, func:usedFunction,param:param}));
        if(error_localization[desc])
          setAlert({open: true, title: title, desc: error_localization[desc]['TH'],type:type});
        else if(notification_localization[desc])
          setAlert({open: true, title: title, desc: notification_localization[desc]['TH'],type:type});
        else
          setAlert({open: true, title: title, desc: desc,type:type});

      }, 250);

    }
    

  


    return (
        <AlertContext.Provider
          value={{
            willAlert,
            setupNotification,
            getInitialNotification,
            registerNotification,
            loadNotification,
            reciveReport,
            alertStack
          }}
        >
            <AlertModal 
              open={alertRef.current.open} 
              onClose={() => setAlert(prev => ({...prev,open: false}))} 
              title={alert.title} 
              desc={alert.desc} 
              type= {alert.type}
              ok = {useFunction.func()}
              param = {useFunction.param} 
              />
            {children}
        </AlertContext.Provider>
      );


}



export { AlertProvider, useAlert };