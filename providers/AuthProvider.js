import React, {createContext,useContext,useState,useMemo,useEffect,useRef} from 'react'
import {
    memberLogin,
    memberLogout,
    memberRegister,
    volunteerLogin,
    organizationRegister,
    editUserData, 
    editUserPassword,
    updateProfileImage,
    updateAddress,
    editVolunteerData,
    updateOrganizeAddress,
    editOrganizeData,
    updatePhone,
    addVolunteer
} from '../controllers/userControllers'
import {sendToken,sendUserLocation} from '../controllers/notificationControllers'
import { checkSession,setSettingStorage, getSettingStorage } from '../controllers/storageControllers';
import { Notifications } from 'react-native-notifications';
import {AppState} from 'react-native'

const AuthContext = createContext({})
const useAuth = () => {
    const auth = useContext(AuthContext)
    if(auth == null) {throw new Error ('useAuth() must call inside AuthProvider')}
    return auth;
}




const AuthProvider = ({children}) => {


    //ตัวเก็บ session 
    const [session,_setSession] = useState({ id: null, username: "" ,phone: "",role:null,teamrole:null});
    const sessionRef = useRef(session);
    const setSession = data => {
        sessionRef.current = data;
        _setSession(data);
    };
    const [setting,setSetting] = useState({
        auto_open_tracking: false,
        background_alert: true,
    });
    

    useEffect(() => {
        const appStateListener = AppState.addEventListener(
        'change',
            nextAppState => {

                if(nextAppState == 'background' && session.role){
                    setSettingStorage(setting,(session.role != 'guest') ? session.id : null);
                }
                
            },
        );
        return () => {
            appStateListener?.remove();
        };
    }, [setting]);

    const loadSetting = async (session_data) => {

        try {
    
            let data = await getSettingStorage(session_data);
            if(data)
                setSetting(data)

            return data;


        } catch(err) {

            throw err;

        }

    }


    const checkLogin = async () => {

        try {
    
            let data = await checkSession();
            if(data)
            {
                setSession({...session,id: data._id, username: data.username, phone: data.phone,role:data.role,teamrole:data.teamrole})
                return {id: data._id, username: data.username, phone: data.phone,role:data.role,teamrole:data.teamrole}

            } else {
                setSession({...session,role:'guest'})
                return null;
            }



        } catch {

            throw err;

        }

    }

    const Login = async (usernameorphone: String, password: String,role: String) => {

        try {

            switch(role) {

                case 'member':
                    let memberData = await memberLogin({usernameorphone: usernameorphone, password: password}).catch(err => {throw err})
                    setSession({...session,id: memberData._id, username: memberData.username, phone: memberData.phone, role:memberData.role})
                break;
                case 'volunteer':
                    let volunteerData = await volunteerLogin({usernameorphone: usernameorphone, password:password}).catch(err => {throw err})
                    setSession({...session,id: volunteerData._id, username: volunteerData.username, phone: volunteerData.phone,role:volunteerData.role, teamrole: volunteerData.teamrole})
                break;

            }
            console.log('Login!');

        } catch (err) {
            
            throw err;
        }

    }


    const Logout = async () => {
        try {
            await memberLogout(session.id,session.role);
            setSession({ id: null, username: "" ,phone: "",role:'guest',teamrole:null});
            console.log('Logout!');

        } catch (err) {
            throw err;
        }
    }



    const Register = async(data:{
        username:String,
        password:String,
        name:String,
        surname:String,
        role: 'member' ,
        email:String,
        personalid:String,
        phone:String,
        address: Array<Object>,
        image: Object
    }) => {

        try {
            

            await memberRegister(data);
            await Login(data.phone,data.password,'member')


        } catch (err) {

            throw err;

        }

    }

    const OrganizeRegister = async (
        membersWithId : [{
            id: String,
            member: Object
        }],
        organization : {
    
            name: String,
            branchname: String,
            description: String,
            address: Object
    
        }
    ) => {

        try {
        
            const members = membersWithId.map((o) => {

                let member = o.member;
                member.uuid = o.id;
                return member;

            });
            
            await organizationRegister(members,organization);

            const index = members.findIndex(obj => obj.teamrole === 'leader');
            await Login(members[index].username,members[index].password,'volunteer');


        } catch (err) {
            throw err;
        }
    }

    const updateUserData = async (data:{
        username:String,
        name:String,
        surname:String,
        email:String,
        personalid:String,
        phone:String,
    }) => {

        try {

            await editUserData(session.id,data);

        } catch (err) {
            throw err;
        }
        
    }

    const updateVolunteerData = async (data:{
        username:String,
        name:String,
        surname:String,
        email:String,
        personalid:String,
        phone:String,
        teamrole: String
    },id) => {

        try {

            await editVolunteerData(id,data);

        } catch (err) {
            throw err;
        }
        
    }

    const updateUserPassword = async (data:{
        oldpassword: String,
        password: String
    },id = session.id) => {

        try {

            await editUserPassword(id,data);

        } catch (err) {
            throw err;
        }
        
    }

    const updateImage = async (
        image: Object,
        id = session.id
    ) => {

        try {
            
            await updateProfileImage(id,image);

        } catch (err) {
            throw err;
        }
        
    }

    const updateUserAddress = async (
        address: Array<Object>
    ) => {

        try {

            let data = await Promise.all(
                address.map((place) => {
                    place.address.userId = session.id,
                    place.address.name = place.name;
                    place.address.location = {
                      type:'Point',
                      coordinates: [place.address.location.lon,place.address.location.lat]
                    }
                    return place.address;
                  }
                )
            )

            

            await updateAddress(session.id,data);

        } catch (err) {
            throw err;
        }
        
    }

    const updateVolunteerAddress = async (
        id: String,
        address: Object
    ) => {

        try {
            const addressData = JSON.parse(JSON.stringify(address));
            addressData.location = {
                coordinates: [address.location.lon, address.location.lat], 
                type: "Point"
            }
            await updateOrganizeAddress(id,addressData);

        } catch (err) {
            throw err;
        }
        
    }

    const updateOrganizeData = async (id:String ,data:{
        name:String,
        branchname:String,
        email:String,
        description:String,
    }) => {

        try {

            await editOrganizeData(id,data);

        } catch (err) {
            throw err;
        }
        
    }

    const updateOrganizePhone = async (id:String ,phone: Array<String>) => {

        try {
            
            let phoneData = phone.map(item => item.phone);
            await updatePhone(id,phoneData);

        } catch (err) {
            throw err;
        }
        
    }

    const insertVolunteer = async (id:String ,member: Object) => {

        try {
            
            await addVolunteer(id,member);

        } catch (err) {
            throw err;
        }
        
    }

    
    return (
        <AuthContext.Provider
          value={{
            session,
            setting,
            sessionRef,
            setSession,
            setSetting,
            Register,
            Login,
            Logout,
            checkLogin,
            OrganizeRegister,
            updateUserData,
            updateVolunteerData,
            updateUserPassword,
            updateImage,
            updateUserAddress,
            updateVolunteerAddress,
            updateOrganizeData,
            updateOrganizePhone,
            insertVolunteer,
            loadSetting
          }}
        >
          {children}
        </AuthContext.Provider>
      );

}

export { AuthProvider, useAuth };