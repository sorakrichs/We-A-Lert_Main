import React, {createContext,useContext,useState} from 'react'
import {sendReport,sendValidate,updateStatus} from '../controllers/reportControllers'
import { markerToAddress } from '../controllers/mapControllers'
import {useAuth} from './AuthProvider'
import {useMap} from './MapProvider'
import uuid from 'uuid-random';
const ReportContext = createContext({})
const useReport = () => {
    const report = useContext(ReportContext)
    if(report == null) {throw new Error ('useReport() must call inside ReportProvider')}
    return report;
}

const ReportProvider = ({children}) => {

    const [images,setImages] = useState([]);
    const [description,setDescription] = useState('');
    const [page,setPage] = useState('');
    const [type,setType] = useState(null);
    const [subType,setSubType] = useState(null);
    const [address,setAddress] = useState(null); 
    const [reportVisable,setReportVisible] = useState(false);
    const [data,setData] = useState(null)
    const {setReportPin,map,setValidateMarker,updatePinStatus} = useMap();
    const {session} = useAuth(); 

    const pushImage = (image) => {
      
      if(Array.isArray(image))
        setImages([...images,...image]);
      else
        setImages([...images,image]);

    }

    const removeImage = (index) => {

      let array = images;
      array.splice(index, 1)
      setImages(array);
      
    } 

    const reportClear = () => {

      setImages([]);
      setType(null);
      setSubType(null);
      setDescription('');
    }

    const getLocation = async () => {


        try {

          let location = await map.current.call('location');
          const address = await markerToAddress(location);
          
          if(address.country != 'Thailand' && address.country != 'ประเทศไทย')
            throw new Error (`สามารถรายงานได้แค่ในประเทศไทยเท่านั้น`)

          address.location = location;
          setAddress(address);
          return address;
        } catch (err) {
          throw err;
        } 


    }

    const send = async () => {

      try {

          let id = await sendReport(session,address,images,description);
          let report = {}
          report.address = address;
          report.report_id = id;
          report.images = images;
          report.description = description;
          report.date = new Date();
          report.date.setDate(report.date.getDate() + 1);
          await setReportPin(id,report,'mypin');
          reportClear();
      } catch (err) {
        throw err
      }
    }

    const validate = async (report_id,data,reportUser) => {

      try {

        await sendValidate(session,report_id,reportUser,data,address.location,type,subType,images,description);
        await setValidateMarker(report_id);
        reportClear();
        
      } catch (err) {
        throw err
      }
    }

    const updateReportStatus = async (status: String) => {

      try {

        await updateStatus(address?._id,status);
        updatePinStatus(address?._id,status);
        
      } catch (err) {
        throw err
      }
    }

    const setReport = (report) => {
      setAddress(report.address);
      setType(report.type);
      setSubType(report.subtype);
      setData(report.data)
      setImages(report.images)
      setDescription(report.description)
    }




    return (
        <ReportContext.Provider
          value={{
            images,
            page,
            type,
            subType,
            address,
            description,
            data,
            pushImage,
            setPage,
            reportClear,
            setType,
            setSubType,
            getLocation,
            setAddress,
            send,
            validate,
            setReport,
            updateReportStatus,
            removeImage,
            setDescription,
          }}
        >
          {children}
        </ReportContext.Provider>
      );


}



export { ReportProvider, useReport };