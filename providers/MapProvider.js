import React, {createContext,useContext,useState,useEffect,useRef, useMemo} from 'react'
import {AppState} from 'react-native'
import Longdo from 'longdo-map-react-native'
import { getMemberAddress,getUserLocation} from '../controllers/userControllers'
import { markerToAddress, findPlace } from '../controllers/mapControllers'
import {base64Marker} from '../assets/images'
import uuid from 'uuid-random'
import {setPinStorage , getPinStorage} from '../controllers/storageControllers'
import {getAllReport,getReport} from '../controllers/reportControllers'
import {useAuth} from './AuthProvider'
import {getEarthquakeFormAPI} from '../controllers/microController'
let keyAPI = '0ba75287512b12f50f558308fb6c720c';
Longdo.apiKey = keyAPI;

const MapContext = createContext({})



const useMap = () => {
    const map = useContext(MapContext)
    if(map== null) {throw new Error ('useMap() must call inside AuthProvider')}
    return map;
}

function useInterval(callback, delay) {
    const savedCallback = useRef();
  
    // Remember the latest callback.
    useEffect(() => {
      savedCallback.current = callback;
    }, [callback]);
  
    // Set up the interval.
    useEffect(() => {
      let id = setInterval(() => {
        savedCallback.current();
      }, delay);
      return () => clearInterval(id);
    }, [delay]);
    
  }


const MapProvider = ({children}) => {
    const {session} = useAuth();
    const [pin,setPin] = useState(new Map());
    const [focusRoutePin,_setFocusRoutePin] = useState(null);
    const [isFocus,setIsFocus] = useState(false);
    const [tracking,_setTracking] = useState(false);
    const trackingRef = useRef(tracking);
    const setTracking = data => {
        trackingRef.current = data;
        _setTracking(data);
    };
    const [volunteer,_setVolunteer] = useState({id:null,name:null,phone:null,type:'volunteer'});
    const volunteerRef = useRef(volunteer);
    const setVolunteer = data => {
        volunteerRef.current = data;
        _setVolunteer(data);
    };

    const map = useRef(null);
    const focusRoutePinRef = useRef(focusRoutePin);
    const setFocusRoutePin = data => {
        focusRoutePinRef.current = data;
        _setFocusRoutePin(data);
    };

    useInterval(() => {
        void (async () => {
            if(trackingRef.current && volunteerRef.current.id) {
                await setVolunteerLocationPin(volunteerRef.current);
            }

        })()

    },5000);

    async function setVolunteerLocationPin(volunteer:Object){

        try {


            let id = uuid();
            let location = await getUserLocation(volunteer.id);
            let Marker = Longdo.object('Marker', location, { icon: { url: base64Marker.Volunteermarker}});
            Marker.$id = id;
            let key = [...pin.entries()].filter(({1 : value}) => value.type === 'volunteer').map(([k]) => k);
            if(key.length != 0)
            {
                pin.delete(key[0])
                setPin(pin);
                map.current.call('Overlays.remove',{$id:key[0], $object:'Marker'});
            }

            map.current.call('Overlays.add', Marker);
            setPin(pin.set(id,volunteer));
            
            
        } catch (err) {
            throw err;
        }

    }

    




    const getPinIconByType = (type:String,status='') => {

        switch(type){
            case('car'):
                return (status == 'finish') ? base64Marker.AccidentmarkerValidated : base64Marker.Accidentmarker;
            break;
            case('fire'):
                return (status == 'finish') ? base64Marker.firemarkervalidated : base64Marker.firemarker;
            break;
            case('flood'):
                return (status == 'finish') ?  base64Marker.Floodmarkervalidated :base64Marker.Floodmarker;
            break;
            case('earthquake'):
                return (status == 'finish') ?  base64Marker.Earthmarkervalidated : base64Marker.Earthmarker;
            break;
            case('epidemic'):
                return (status == 'finish') ?  base64Marker.Pandemicmarkervalidated : base64Marker.Pandemicmarker;
            break;
            default:
                return base64Marker.Reportmarker
            break;
        }


    }



    // Load Pin Section
    const loadPin = async (session_id: String) => {

        try {
            let pinInStorage = await getPinStorage(session_id);
            if(pinInStorage == null) return;
            await Promise.all(

                pinInStorage.map((value) => {

                    const icon = getPinIconByType(value[1].type);
                    pin.set(value[0],value[1]);
                    let Marker = Longdo.object('Marker', value[1].address.location, { icon: { url: icon}});
                    Marker.$id = value[0];
                    map.current.call('Overlays.add', Marker);

                })

            )

            setPin(pin);
        } catch (err) {
            throw err;
        }
    }


    const reloadPin = async () => {
        map.current.call('Overlays.clear')
        await Promise.all(
            Array.from(pin.keys()).map((key) => {


                map.current?.call('Overlays.add',{$id:key, $object:'Marker'} );

            })
        );
        
        if(focusRoutePinRef.current)
            routing(focusRoutePinRef.current);

        
    }

    const loadPinFromServer = async () => {
        try {
            const reports = await getAllReport();
            await Promise.all(reports.map( (report) => {  
                let data = {
                    _id: report._id,
                    address:{
                        aoi : report.aoi,
                        subdistrict:report.subdistrict,
                        district:report.district,
                        province: report.province,
                        postcode: report.postcode,
                        location: {
                            lon: report?.location?.coordinates[0],
                            lat: report?.location?.coordinates[1]
                        }
                    },
                    type: report.type,
                    subtype: report.subtype,
                    data: report.reportData,
                    status: report.status,
                    user: report.user,
                    memberImage: report.memberImage,
                    volunteer: report.volunteer,
                    volunteerImage: report.volunteerImage,
                    images: report.images,
                    description: report.description
                }
                setPin(pin.set(report._id,data));
                const icon = getPinIconByType(report?.type,report?.status);
                let Marker = (icon) ? Longdo.object('Marker', data.address.location, { icon: { url: icon}}) : Longdo.object('Marker', report.location);
                Marker.$id = report._id;
                map.current.call('Overlays.add', Marker);  
                
            }))
        } catch (err) {
            throw err
        }
    }

    const loadPinFromExternalAPI = async () => {
        let datas = await getEarthquakeFormAPI();  
        const icon = getPinIconByType('earthquake','finish');
        await Promise.all(datas.map((data) => {

            let Marker = Longdo.object('Marker',{lat:data.geometry?.coordinates[1],lon:data.geometry?.coordinates[0]}, { icon: { url: icon}})
            Marker.$id = data.id;
            map.current.call('Overlays.add', Marker);
            pin.set(data.id,{
                location:{lat:data.geometry.coordinates[1],lon:data.geometry?.coordinates[0]},
                mag: data.properties.mag,
                type: 'earthquake',
                magType: data.properties.magType,
                from: 'earthquake.usgs.gov',
                time: new Date(data.properties.time),
                updated: new Date(data.properties.updated),
                url: data.properties.url,
                place: data.properties.place
            });
        }))
    }


    const trackingVolunteer = async (volunteer:Object ,pin_id: String) => {
        try {

            if(!trackingRef.current){
                let key = [...pin.entries()].filter(({1 : value}) => value.type === 'you').map(([k]) => k);
                map.current.call('Overlays.clear');
                map.current.call('Overlays.add',{$id:key[0], $object:'Marker'});
                map.current.call('Overlays.add',{$id:pin_id, $object:'Marker'});
                setVolunteer({...volunteer,type:'volunteer'});
                setTracking(true);

            } else {

                let volunkey = [...pin.entries()].filter(({1 : value}) => value.type === 'volunteer').map(([k]) => k);
                map.current.call('Overlays.remove',{$id:volunkey[0], $object:'Marker'});
                pin.delete(volunkey[0])
                setPin(pin)
                setTracking(false);
                setVolunteer({id:null,name:null,phone:null,type:'volunteer'});
                map.current.call('Overlays.clear');
                await reloadPin();

            }

        } catch (err) {
            throw err;
        }
    }

    const savePin = () => {
        if(session.role)
            setPinStorage(pin,(session.role != 'guest') ? session.id : null);
    }

    



    
    useEffect(() => {
        const appStateListener = AppState.addEventListener(
        'change',
            nextAppState => {
                console.log('Next AppState is: ', nextAppState);
                if(nextAppState == 'background'){
                    savePin();
                }
                
            },
        );
        return () => {
            appStateListener?.remove();
        };
    }, [pin]);




    const setReportPin = (id:String ,report:Object,type:String) => {

        report.type = (type) ? type : 'undefined'
        report.report_id = id;
        let Marker = Longdo.object('Marker', report.address.location, { icon: { url: base64Marker.Reportmarker}})
        Marker.$id = uuid();
        map.current.call('Overlays.add', Marker);
        setPin(pin.set(Marker.$id,report));


    }


    const mapClear = async () => {
        await map.current.call('Overlays.clear');
    }

    const clearPinData = async () => {
        setPin(new Map());
        await map.current.call('Route.clear');
        await map.current.call('Overlays.clear');
    }
    



    const setNotiReportPin = async (location:Object,desc = '',reportUser: Object,imageUrl: Array<String>,report_id: String) => {

        try {
            let key = [...pin.entries()].filter(({1 : value}) => value.report_id === report_id).map(([k]) => k);
            if(key.length <= 0) {
                let id = uuid();
                let desMarker = Longdo.object('Marker', location, { icon: { url: base64Marker.Reportmarker}});
                desMarker.$id = id;
                map.current.call('Overlays.add', desMarker);
                let report = {}
                report.address = await markerToAddress(location);
                report.report_id = report_id;
                report.address.location = location;
                report.description = desc;
                report.reportUser = reportUser;
                report.type = 'report'
                report.images = imageUrl;
                report.date = new Date();
                report.date.setDate(report.date.getDate() + 1);
                setPin(pin.set(id,report));
                await setFocus(id);
            } else {
                await setFocus(key[0]);
            }

            focusLocation(location);
            return key;
        } catch (err) {

            throw err

        }


    }






    const routing = (desLocationId) => {

        try {
            let key = [...pin.entries()].filter(({1 : value}) => value.type === 'you').map(([k]) => k);
            map.current.call('Route.clear');
            map.current.call('Route.line', 'road', {
            lineColor: '#009910',
            lineWidth: '2',
            borderColor: '#000000',
            borderWidth: '1',
            });
            map.current.call('Route.add',{$id:key[0], $object:'Marker'});
            map.current.call('Route.add',{$id:desLocationId, $object:'Marker'});
            map.current.call('Route.search');
        } catch (err) {
            throw err;
        }
    }


    const setYourLocationPin = (location:Object) => {

        try {

            let key = [...pin.entries()].filter(({1 : value}) => value.type === 'you').map(([k]) => k);
            if(key.length > 0) {
                map.current.call('Overlays.remove',{$id:key[0], $object:'Marker'});
                pin.delete(key[0]);
            }
            let id = uuid();
            let Marker = Longdo.object('Marker', location, { icon: { url: base64Marker.Membermarker}});
            Marker.$id = id;
            let address = {};
            address.location = location;
            address.type = 'you';


            
            setPin(pin.set(id,address));

            if(focusRoutePin)
                routing(focusRoutePin);
            
            map.current.call('Overlays.add', Marker);
            
        } catch (err) {
            throw err;
        }

    }

    const removePin = (id) => {

        try {

            map.current.call('Overlays.remove',{$id:id, $object:'Marker'});
            map.current.call('Route.clear');
            pin.delete(id)
            setPin(pin);
            
        } catch (err) {
            throw err;
        }

    }

    const focusLocation = (location: {lat: Number,lon: Number}) => {

        map.current.call('location',location);

    }


    

    const setHome = async (userid) => {

        try {

            let data = await Promise.all([...pin.entries()].filter(({1 : value}) => value.type === 'home').map((k) => k[1]));

            if(data.length<=0)  
                data = await getMemberAddress(userid);

            await Promise.all(data.map( addressData => {

                let home = {}
                let {location} = addressData;
                let Marker = Longdo.object('Marker', {lat:location?.coordinates[1],lon:location?.coordinates[0]}, 
                    { icon: { url: base64Marker.Housemarker}});
                Marker.$id = addressData._id;
                map.current.call('Overlays.add', Marker);
                home.address = addressData;
                home.type = 'home';
                setPin(pin.set(addressData._id,home));
                
            }));
            
        } catch (err) {
            throw err;
        }

    }

    const setSearchLocationPin = async (data) => {

        try {

            let location = {
                lon: data.lon,
                lat: data.lat,
              };
            map.current.call('location', location);
            let Marker = Longdo.object('Marker', location);
            Marker.$id = "S" + data.id;
            map.current.call('Overlays.add', Marker);   
            map.current.call('zoom', 16);
            setPin(pin.set(Marker.$id,{
                type: 'searchPin',
                name: data.name,
                address: data.address
            }));
        } catch (err) {
            throw err;
        }

    }

    const setFocus = async (id) => {

        try {
            await map.current.call('zoom', 16);
            setFocusRoutePin(id);
            routing(id)
            setIsFocus(true);
        } catch (err) {
            throw err
        }

    }

    const clearFocus = () => {

        map.current.call('Route.clear');
        map.current.call('Overlays.add',{$id:focusRoutePin, $object:'Marker'} );
        setFocusRoutePin(null);
        setIsFocus(false);

    }

    const getReportData = (id) => {

        if(pin.size>0)
        {   

            return pin.get(id);

        }

    }

    const setExploreMarker = (place,tag) => {
        try {

            let id = place.id;
            let data = {
                name: place.name,
                address: place.address,
                location : { lat: place.lat, lon: place.lon }
            };

            let Marker = Longdo.object('Marker', place, { icon: { url: (tag == 'สถานพยาบาล') ? base64Marker.Hospitalmarker : base64Marker.Policemarker}});
            Marker.$id = id;
            map.current.call('Overlays.add', Marker);  


            
        } catch (err) {

            throw err;

        } 
    }

    const removeExploreMarker = (place,tag) => {
        try {

            let id = uuid();
            let Marker = Longdo.object('Marker', place, { icon: { url: (tag == 'สถานพยาบาล') ? base64Marker.Hospitalmarker : base64Marker.Organizemarker}});
            Marker.$id = id
            map.current.call('Overlays.add', Marker);   
            return 
            
        } catch (err) {

            throw err

        } 
    }

    const setValidateMarker = async (report_id: String) => {

        try {
            let keys = [...pin.entries()].filter(({1 : value}) => value?.report_id === report_id).map(([k]) => k);
            if(keys.length != 0)
            {
                map.current.call('Overlays.remove',{$id:keys[0], $object:'Marker'});
                pin.delete(keys[0])
                setPin(pin);
            }


            const report = await getReport(report_id);

            let data = {
                _id: report._id,
                address:{
                    aoi : report.aoi,
                    subdistrict:report.subdistrict,
                    district:report.district,
                    province: report.province,
                    postcode: report.postcode,
                    location: {
                        lon: report?.location.coordinates[0],
                        lat: report?.location.coordinates[1]
                    }
                },
                type: report.type,
                subtype: report.subtype,
                data: report.reportData,
                status: report.status,
                user: report.user,
                memberImage: report.memberImage,
                volunteer: report.volunteer,
                volunteerImage: report.volunteerImage,
                images: report.images,
                description: report.description
            }


            setPin(pin.set(report._id,data));

            const icon = getPinIconByType(data?.type,data?.status);
            let Marker = (icon) ? Longdo.object('Marker', data.address.location, { icon: { url: icon}}) : Longdo.object('Marker', data.address.location);
            Marker.$id = report._id;
            map.current.call('Overlays.add', Marker);  
            map.current.call('Route.clear');

        } catch (err) {
            throw err
        }
            


    }

    const getValidateMarker = async (report_id: String) => {

        try {

            const report = await getReport(report_id);
            let keys = [...pin.entries()].filter(({1 : value}) => value?.report_id === report_id).map(([k]) => k);
            if(keys.length >= 0)
            {
                map.current.call('Overlays.remove',{$id:keys[0], $object:'Marker'});
                pin.delete(keys[0])
                setPin(pin);
                if(report.volunteer._id == volunteerRef.current.id)
                    trackingVolunteer(volunteerRef.current,keys[0]);
            }




            let data = {
                _id: report._id,
                address:{
                    aoi : report.aoi,
                    subdistrict:report.subdistrict,
                    district:report.district,
                    province: report.province,
                    postcode: report.postcode,
                    location: {
                        lon: report?.location.coordinates[0],
                        lat: report?.location.coordinates[1]
                    }
                },
                type: report.type,
                subtype: report.subtype,
                data: report.reportData,
                status: report.status,
                user: report.user,
                memberImage: report.memberImage,
                volunteer: report.volunteer,
                volunteerImage: report.volunteerImage,
                images: report.images,
                description: report.description
            }

            
            setPin(pin.set(data._id,data));
            if(!trackingRef.current) {
                const icon = getPinIconByType(data?.type,data?.status);
                let Marker = (icon) ? Longdo.object('Marker', data.address.location, { icon: { url: icon}}) : Longdo.object('Marker', data.address.location);
                Marker.$id = data._id;
                map.current.call('Overlays.add', Marker);  
                focusLocation(data.location);
            }

        } catch (err) {
            throw err
        }
            


    }

    const getReportMarker = async (report_id: String) => {

        try {

            const report = await getReport(report_id);

            let data = {
                _id: report._id,
                address:{
                    aoi : report.aoi,
                    subdistrict:report.subdistrict,
                    district:report.district,
                    province: report.province,
                    postcode: report.postcode,
                    location: {
                        lon: report?.location?.coordinates[0],
                        lat: report?.location?.coordinates[1]
                    }
                },
                type: report.type,
                subtype: report.subtype,
                data: report.reportData,
                status: report.status,
                user: report.user,
                memberImage: report.memberImage,
                volunteer: report.volunteer,
                volunteerImage: report.volunteerImage,
                images: report.images
            }
            
            setPin(pin.set(report._id,data));
            const icon = getPinIconByType(data?.type,data?.status);
            let Marker = (icon) ? Longdo.object('Marker', data.address.location, { icon: { url: icon}}) : Longdo.object('Marker', data.address.location);
            Marker.$id = data._id;
            map.current.call('Overlays.add', Marker); 
            if(trackingRef.current) {
                map.current.call('Overlays.remove', Marker);  
            } else {
                focusLocation(report.location);
            }

        } catch (err) {
            throw err
        }
            


    }

    const updatePinStatus = (report_id: String, status: String) => {


        let pinaddressData = pin.get(report_id);
        map.current.call('Overlays.remove',{$id:report_id, $object:'Marker'});
        pin.delete(report_id)
        setPin(pin);
        pinaddressData.status  = status;
        pinaddressData.date = new Date();
        pinaddressData.date.setDate(pinaddressData.date.getDate() + 5);

        let icon = getPinIconByType(pinaddressData.type,status);
        let Marker = Longdo.object('Marker', pinaddressData.location, { icon: { 
            url:icon }});
        Marker.$id = report_id+'vali';
        map.current.call('Overlays.add', Marker);
        setPin(pin.set(report_id+'vali',pinaddressData));

    }

    const getPinByType = async (type: String) => {
        try {
            map.current.call('Overlays.clear');
            const data = [...pin.entries()].filter(({1 : value}) => value.type === type || value.type === 'you')

            
            await Promise.all(
                data.map((value) => {

                    map.current.call('Overlays.add',{$id:value[0], $object:'Marker'});
                    if(value[1].type == 'fire'){
                        let Geom = Longdo.object('Circle', value[1].address.location,value[1]?.data.range/111000,
                        {fillColor: 'rgba(255, 0, 0, 0.4)',lineColor: 'rgba(255, 0, 0, 0.8)'});
                        Geom.$id = value[0] + '1';
                        map.current.call('Overlays.add', Geom);
                    }
                })
            )
        } catch(err) {
            throw err
        }
    }

    const volunteerAcceptReport = async (report_id:String,volunteer:Object) => {

        let key = [...pin.entries()].filter(({1 : value}) => value.report_id === report_id).map(([k]) => k);
        let data = pin.get(key[0]);
        data.volunteer = volunteer;
        setPin(pin.set(key[0],data))
        focusLocation(data.address.location)
        await trackingVolunteer(volunteer,key[0]);
    }

  

    return (
        <MapContext.Provider
          value={{
              map,
            Longdo,
            keyAPI,
            tracking,
            isFocus,
            volunteerAcceptReport,
            focusLocation,
            setReportPin,
            getReportData,
            setYourLocationPin,
            setNotiReportPin,
            loadPin,
            setHome,
            setPin,
            setExploreMarker,
            reloadPin,
            routing,
            setIsFocus,
            setFocus,
            setValidateMarker,
            getValidateMarker,
            updatePinStatus,
            loadPinFromServer,
            getPinByType,
            mapClear,
            trackingVolunteer,
            clearPinData,
            loadPinFromExternalAPI,
            setSearchLocationPin,
            removePin,
            clearFocus,
            savePin,
            getReportMarker
          }}
        >
          {children}
        </MapContext.Provider>
      );

}

export { MapProvider, useMap };