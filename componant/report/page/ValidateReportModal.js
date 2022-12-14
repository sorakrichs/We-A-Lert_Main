
import React,{useState, useMemo,useEffect,useCallback,useRef} from 'react'
import {
    View,
    Text,
    Image,
    Pressable,
    SafeAreaView,
    Button,
    StyleSheet,
    TouchableHighlight,
    Dimensions,
    TouchableOpacity,
    TextInput,
    Alert,
    ScrollView
    } from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';
import MIcon from 'react-native-vector-icons/MaterialCommunityIcons'
import {useReport} from '../../../providers/ReportProvider'
import {useMap} from '../../../providers/MapProvider'
import {useAlert} from '../../../providers/AlertProvider'
import cardata from '../../../data/cardata.json'
import DropDownPicker from 'react-native-dropdown-picker';
import Header from '../../subComponant/Header'

const ValidateReportModal = ({navigation,route}) => {

    const {report_id,reportUser} = route?.params?.report;
    const {willAlert} = useAlert();
    const {
        getLocation,
        address,
        setAddress,
        send,
        type,setType,subType,setSubType,
        validate,
        description,setDescription} = useReport();

        const [validateButton,_setValidateButton] = useState(false);
        const validateButtonRef = useRef(validateButton);
        const setValidateButton = data => {
            validateButtonRef.current = data;
            _setValidateButton(data);
        };
        const [litigant,setLitigant] = useState([{license:'',make:'',model:'',category:''}]);
        const [patient,setPatient] = useState([{name:'',surname:'',symptom:''}]);
        const [range,setRange] = useState(null);
        const [depth,setDepth] = useState(null);
        const [magnitude,setMagnitude] = useState(null);
        const [tsunami,setTsunami] = useState(false);
        const [tsunamiOpen, setTsunamiOpen] = useState([false]);
        const [makeOpen, setMakeOpen] = useState([false]);
        const [modelOpen, setModelOpen] = useState([false]);

        const clearData = () => {
            setLitigant([{license:null,make:null,model:null,category:null}]);
            setPatient([{name:null,surname:null,symptom:null}]);
            setRange(null);
            setMagnitude(null);
            setTsunami(false);
            setMakeOpen([false]);
            setModelOpen([false]);
            setValidateButton(false);
            setDepth(null);
        }

        const checkLitigant = async () => {
            let check = true;
            check = await Promise.all(
                litigant.map((value) => {

                    if(!value.license || !value.make || !value.model ) {
                        setValidateButton(false);
                        check = false;
                    }
                })

            )
            
            if(check)
                setValidateButton(true);
        }
      
        const addLitigant = () => {
            setLitigant([...litigant,{license:null,make:null,model:null,category:null}]);
            setMakeOpen([...makeOpen,false]);
            setModelOpen([...modelOpen,false]);
        }

        const removeLitigant = async () => {
            litigant.pop()
            makeOpen.pop()
            modelOpen.pop()
            setLitigant([...litigant]);
            setMakeOpen([...makeOpen]);
            setModelOpen([...modelOpen]);
            await checkLitigant();
        }

        const checkPatient = async () => {
            let check = true;
            check = await Promise.all(
                patient.map((value) => {

                    if(!value.name || !value.surname || !value.symptom ) {
                        setValidateButton(false);
                        check = false;
                    }
                })

            )
            
            if(check)
                setValidateButton(true);
        }

        const addPatient = () => {
            setPatient([...patient,{name:null,surname:null,symptom:null}]);

        }

        const removePatient  = async () => {
            patient.pop()
            setPatient([...patient]);
            await checkPatient();
        }

        const validateData = async () => {
            try{

                let data = {};
                switch(type) {

                    case('car'): 
                        data.litigant = litigant;
                        setLitigant([{license:null,make:null,model:null,category:null}]);
                    break;
                    case('fire'): 
                        data.range = range;
                        setRange(null);
                    break;
                    case('flood'):
                        data.depth = depth;
                        setDepth(null);
                    break;
                    case('earthquake'):
                        data.magnitude = magnitude;
                        data.tsunami = tsunami;
                        setMagnitude(null);
                        setTsunami(false);
                    break;
                    case('epidemic'):
                        data.patient = patient;
                        setPatient([{name:null,surname:null,symptom:null}]);
                    break;

                }
                await validate(report_id,data,reportUser);
                willAlert('????????????????????????????????????????????????????????????????????????');
                navigation.navigate('Map')

            } catch (err) {

                willAlert('????????????????????????????????????????????????',(err?.response?.data?.message) ? err?.response?.data?.message : err?.message);

            }
        }

    useEffect(()=> {    
        
        let active = true; 
        if(route?.params?.report && active)
            setAddress(route?.params?.report?.address);
        return () => { active = false;};

    },[])



    return (
        <SafeAreaView style={styles.container}>
            <Header
                navigation={navigation}
                title = {'?????????????????????????????????????????????'}
                color = {'limegreen'}
    
            />
            <ScrollView>
                <View style={styles.section}>
                    <Text style={styles.subTopic}>?????????????????????????????????????????????</Text> 
                    <View style={styles.selectSection}>
                        <TouchableOpacity 
                        style={[styles.typeButton,
                            {
                                backgroundColor: 'gray',
                                borderWidth: (type == 'car') ? 5: 0,
                                padding: (type == 'car') ? -5 : 0

                            }]}  
                            onPress={() => {setType('car'); setSubType(null); clearData(); }}
                        >
                            <Icon name="car" size={80} color="white"/>
                            <Text style={styles.selectText}>?????????????????????</Text>
                        </TouchableOpacity>
                        <TouchableOpacity 
                        style={[styles.typeButton,
                            {
                                backgroundColor:'orangered',
                                borderWidth: (type == 'fire') ? 5: 0,
                                padding: (type == 'fire') ? -5 : 0
                            }]}  
                        
                        onPress={() => {setType('fire');  setSubType(null); clearData(); }}>
                            <MIcon name="fire" size={80} color="white"/>
                            <Text style={styles.selectText}>??????????????????</Text>
                        </TouchableOpacity>
                        <TouchableOpacity 
                        style={[styles.typeButton,
                            {
                                backgroundColor:'royalblue',
                                borderWidth: (type == 'flood') ? 5: 0,
                                padding: (type == 'flood') ? -5 : 0
                            }]}  
                        
                        onPress={() => {setType('flood');  setSubType(null); clearData(); }}>
                            <MIcon name="home-flood" size={80} color="white"/>
                            <Text style={styles.selectText}>?????????????????????</Text>
                        </TouchableOpacity>
                        <TouchableOpacity 
                        style={[styles.typeButton,
                            {
                                backgroundColor:'yellowgreen',
                                borderWidth: (type == 'epidemic') ? 5: 0,
                                padding: (type == 'epidemic') ? -5 : 0
                            }]}  
                        
                        onPress={() => {setType('epidemic');  setSubType(null); clearData(); }}>
                            <MIcon name="virus" size={80} color="white"/>
                            <Text style={styles.selectText}>????????????????????????</Text>
                        </TouchableOpacity>
                        <TouchableOpacity 
                        style={[styles.typeButton,
                            {
                                backgroundColor: 'lightgray',
                                borderWidth: (type == 'earthquake') ? 5: 0,
                                padding: (type == 'earthquake') ? -5 : 0,
                                borderColor:'gray',
                                padding:5
                            }]}  
                            onPress={() => {setType('earthquake');  setSubType(null); clearData(); }}
                        >
                            <Image source={require('../../../assets/report/earthquake.png')} style={{width: 90, height: 90}}/>
                            <Text style={styles.selectText}>??????????????????????????????</Text>
                        </TouchableOpacity>
                    </View>
                </View> 


                { (type == 'car') ? 
                <View style={styles.section}>
                    <Text style={styles.subTopic}>??????????????????</Text> 
                    <View style={styles.selectSection}>
                        <TouchableOpacity 
                        style={[styles.typeButton,
                            {
                                backgroundColor: 'lightgray',
                                borderWidth: (subType == 'broken') ? 5: 0,
                                padding: (subType == 'broken') ? -5 : 0,
                                borderColor:'gray',
                                padding:5
                            }]}  
                            onPress={() => {setSubType('broken'); clearData();}}
                        >
                            <Image source={require('../../../assets/report/brokencar.png')} style={{width: 90, height: 90}}/>
                            <Text style={styles.selectText}>??????????????????</Text>
                        </TouchableOpacity>
                        <TouchableOpacity 
                        style={[styles.typeButton,
                            {
                                backgroundColor: 'lightsteelblue',
                                borderWidth: (subType == 'crash') ? 5: 0,
                                padding: (subType == 'crash') ? -5 : 0,
                                borderColor:'gray',
                                padding:5
                            }]}  
                            onPress={() => {setSubType('crash'); clearData();}}
                        >   
                            <Image source={require('../../../assets/report/carcrash.png')} style={{width: 90, height: 90}}/>
                            <Text style={styles.selectText}>????????????</Text>
                        </TouchableOpacity>
                    </View>
                </View>  :
                (type == 'fire') ? 
                <View style={styles.section}>
                    <Text style={styles.subTopic}>??????????????????</Text> 
                    <View style={styles.selectSection}>
                        <TouchableOpacity 
                        style={[styles.typeButton,
                            {
                                borderWidth: (subType == 'A') ? 2: 0,
                                padding: (subType == 'A') ? -2 : 0,
                                borderColor:'gray',
                                padding:5,
                                alignItems:'center'

                            }]}  
                            onPress={() => {setSubType('A'); setValidateButton(range);}}
                        >
                            <Image style={{alignSelf:'center'}}source={require('../../../assets/manual/ClassAFire.png')} style={{width: 90, height: 90}}/>
                            <Text style={[styles.selectText,{fontSize:10}]}>?????????????????????????????????????????????????????????</Text>
                        </TouchableOpacity>
                        <TouchableOpacity 
                        style={[styles.typeButton,
                            {
                                borderWidth: (subType == 'B') ? 2: 0,
                                padding: (subType == 'B') ? -2 : 0,
                                borderColor:'gray',
                                padding:5,
                                alignItems:'center'

                            }]}  
                            onPress={() => {setSubType('B'); setValidateButton(range);}}
                        >   
                            <Image source={require('../../../assets/manual/ClassBFire.png')} style={{width: 90, height: 90}}/>
                            <Text style={[styles.selectText,{fontSize:10}]}>????????????????????????????????????????????????????????????????????????</Text>
                            <Text style={[styles.selectText,{fontSize:10}]}>???????????????????????????????????????????????????????????????</Text>
                        </TouchableOpacity>
                        <TouchableOpacity 
                        style={[styles.typeButton,
                            {
                                borderWidth: (subType == 'C') ? 2: 0,
                                padding: (subType == 'C') ? -2 : 0,
                                borderColor:'gray',
                                padding:5,
                                alignItems:'center'

                            }]}  
                            onPress={() => {setSubType('C'); setValidateButton(range);}}
                        >   
                            <Image source={require('../../../assets/manual/ClassCFire.png')} style={{width: 90, height: 90}}/>
                            <Text style={[styles.selectText,{fontSize:10}]}>??????????????????????????????????????????????????????????????????????????????</Text>
                            <Text style={[styles.selectText,{fontSize:10}]}>???????????????????????????????????????????????????????????????????????????</Text>
                        </TouchableOpacity>
                        <TouchableOpacity 
                        style={[styles.typeButton,
                            {
                                borderWidth: (subType == 'D') ? 2: 0,
                                padding: (subType == 'D') ? -2 : 0,
                                borderColor:'gray',
                                padding:5,
                                alignItems:'center'

                            }]}  
                            onPress={() => {setSubType('D'); setValidateButton(range);}}
                        >   
                            <Image source={require('../../../assets/manual/ClassDFire.png')} style={{width: 90, height: 90}}/>
                            <Text style={[styles.selectText,{fontSize:10}]}>???????????????????????????????????????????????????????????????????????????</Text>
                        </TouchableOpacity>
                    </View>
                </View>: null }





                { (subType == 'broken') ? 
                <View style={styles.section}>
                    <Text style={styles.subTopic}>??????????????????????????????????????????</Text> 
                    <View style={{flex:1,margin:10}}>
                        <Text style={styles.textStyle}>?????????????????????</Text>
                        <TextInput 
                            style={styles.input2}
                            placeholder={'?????????????????????????????????'}
                            placeholderTextColor='silver'
                            onChangeText={(text) =>  {
                                litigant[0] = {...litigant[0],license: text};
                                setLitigant(litigant)
                            }}
                            defaultValue={litigant[0].license}
                            onEndEditing={() => setValidateButton(litigant[0].license && litigant[0].model)}
                        />
                    </View>
                    <View style={{flexDirection:'row',marginTop:10}}>
                        <View style = {{flex:1,margin:5}}>
                            <Text style={styles.textStyle}>??????????????????</Text>
                            <DropDownPicker
                                open={makeOpen[0]}
                                value={litigant[0]?.make}
                                items={ Object.keys(cardata).map((value) =>
                                    ({
                                        label: value,
                                        value: value
                                    })
                                )}
                                onOpen={() => setMakeOpen(prev => {
                                    let data = [...prev];
                                    data[0] = true;
                                    return data;
                                })}
                                onClose={() => setMakeOpen(prev => {
                                    let data = [...prev];
                                    data[0] = false;
                                    return data;
                                })}
                                onSelectItem={(item) => {
                                    litigant[0] = {...litigant[0],make: item.value};
                                    setLitigant(litigant)
                                }}
                                listMode="MODAL"
                                placeholder="???????????????????????????????????????"
                                placeholderTextColor='silver'
                                modalProps={{
                                    animationType: "slide"
                                }}

                            />
                        </View>
                        <View style = {{flex:1,margin:5}}>
                            <Text style={styles.textStyle}>????????????</Text>
                            <DropDownPicker
                                open={modelOpen[0]}
                                value={litigant[0]?.model}
                                items={(litigant[0]?.make) ? Object.keys(cardata[litigant[0]?.make]).map((value) =>
                                    ({
                                        label: value,
                                        value: value
                                    })
                                ) : []}
                                onOpen={() => setModelOpen(prev => {
                                    let data = [...prev];
                                    data[0] = true;
                                    return data;
                                })}
                                onClose={() => setModelOpen(prev => {
                                    let data = [...prev];
                                    data[0] = false;
                                    return data;
                                    })}
                                onSelectItem={(item) => {
                                    litigant[0] = {...litigant[0],model: item.value,category: cardata[litigant[0]?.make][item.value].category};
                                    setLitigant(litigant);
                                }}
                                onChangeValue={() => setValidateButton(litigant[0].license && litigant[0].model)}

                                listMode="MODAL"
                                placeholder="???????????????????????????"
                                placeholderTextColor='silver'
                                modalProps={{
                                    animationType: "slide"
                                }}
                                disabled={(litigant[0]?.make) ? false : true}
                            />
                        </View>
                    </View>
                    { litigant[0]?.category ?
                        <View style = {{flex:1,margin:5,alignItems:'center'}}>
                            <Text style={styles.textStyle}>??????????????????</Text>
                            {   litigant[0]?.category.map((value,index) =>
                                <Text key={index} style={styles.categoryText}>{value}</Text>
                            )}
                        </View> : null }
                    </View> : 

                
                (subType == 'crash') ?             
                <View style={styles.section}>
                    <Text style={styles.subTopic}>??????????????????????????????????????????</Text> 
                    { litigant.map((value,index) =>
                        <View key={index} style={styles.inputSection}>
                            <Text style={{fontSize:18,color:'dimgray'}}>{`????????????????????????????????? ${index + 1}`}</Text>
                            <View style={{flex:1,margin:10}}>
                                <Text  style={styles.textStyle}>?????????????????????</Text>
                                <TextInput 
                                    
                                    style={styles.input2}
                                    placeholder={'?????????????????????????????????'}
                                    placeholderTextColor='silver'
                                    onChangeText={(text) =>  {
                                        litigant[index] = {...value,license: text};
                                        setLitigant(litigant);
                                    }}
                                    defaultValue={value?.license}
                                    onEndEditing={() => setValidateButton(litigant[index]?.license && value?.model && text)}
                                />
                            </View>
                            <View style={{flexDirection:'row',marginTop:10}}>
                                <View  style = {{flex:1,margin:5}}>
                                    <Text  style={styles.textStyle}>??????????????????</Text>
                                    <DropDownPicker
                                        open={makeOpen[index]}
                                        value={value?.make}
                                        items={ Object.keys(cardata).map((value) =>
                                            ({
                                                label: value,
                                                value: value
                                            })
                                        )}
                                        onOpen={() => setMakeOpen(prev => {
                                            let data = [...prev];
                                            data[index] = true;
                                            return data;
                                        })}
                                        onClose={() => setMakeOpen(prev => {
                                            let data = [...prev];
                                            data[index] = false;
                                            return data;
                                        })}
                                        onSelectItem={(item) => {
                                            let data = {...value,make: item.value};
                                            litigant[index] = data;
                                            setLitigant(litigant)
                                        }}

                                        listMode="MODAL"
                                        placeholder="???????????????????????????????????????"
                                        placeholderTextColor='silver'
                                        modalProps={{
                                            animationType: "slide"
                                        }}

                                    />
                                </View>
                                <View  style = {{flex:1,margin:5}}>
                                    <Text  style={styles.textStyle}>????????????</Text>
                                    <DropDownPicker
                                        
                                        open={modelOpen[index]}
                                        value={value?.model}
                                        items={(value?.make) ? Object.keys(cardata[value?.make]).map((value) =>
                                            ({
                                                label: value,
                                                value: value
                                            })
                                        ) : []}
                                        onOpen={() => setModelOpen(prev => {
                                            let data = [...prev];
                                            data[index] = true;
                                            return data;
                                        })}
                                        onClose={() => setModelOpen(prev => {
                                            let data = [...prev];
                                            data[index] = false;
                                            return data;
                                        })}
                                        
                                        onSelectItem={(item) => {
                                            const category = cardata[value?.make][item.value].category;
                                            let data = {...value,model: item.value,category: category};
                                            litigant[index] = data;
                                            setLitigant(litigant);
                                            
                                        }}
                                        onChangeValue={() => setValidateButton(value?.license && value?.model)}
                                        listMode="MODAL"
                                        placeholder="???????????????????????????"
                                        placeholderTextColor='silver'
                                        modalProps={{
                                            animationType: "slide"
                                        }}
                                        disabled={(value?.make) ? false : true}
                                    />
                                </View>
                            </View>
                            { value?.category &&
                                <View  style = {{flex:1,margin:5,alignItems:'center'}}>
                                    <Text style={styles.textStyle}>??????????????????</Text>
                                    {   value?.category.map((value,index) =>
                                        <Text key={index} style={styles.categoryText}>{value}</Text>
                                    )}
                                </View>
                            }
                        </View>
                    )}
                        <TouchableOpacity style = {styles.reportbtn} onPress={() => {setValidateButton(false);addLitigant()}}>
                            <Text style = {styles.reportText}>
                                    ???????????????
                            </Text>
                        </TouchableOpacity>
                        { litigant.length > 1 &&
                        <TouchableOpacity style = {[styles.reportbtn,{backgroundColor:'red'}]} onPress={async () => {await removeLitigant()}}>
                            <Text style = {styles.reportText}>
                                    ??????
                            </Text>
                        </TouchableOpacity>}
                    </View> : null }

                {(type == 'fire') && 
                <View style={styles.section}>
                    <Text style={[styles.subTopic,{marginBottom:10}]}>?????????????????????????????????????????????</Text> 
                    <View style={{flex: 1, flexDirection: 'row', flexWrap: 'wrap',alignItems:'center'}}>
                        <TextInput 

                            keyboardType='number-pad'
                            style={styles.input}
                            placeholder={'????????????'}
                            placeholderTextColor='silver'
                            onChangeText={setRange}
                            onEndEditing={() => setValidateButton(range && (subType || type!= 'fire'))}
                        />
                        <Text style={styles.textStyle}>????????????</Text> 
                    </View>
                </View>}

                {type == 'earthquake' && 
                    <>
                        <View style={styles.section}>
                            <Text style={[styles.subTopic,{marginBottom:10}]}>???????????????????????????????????????????????????</Text> 
                            <View style={{flex: 1, flexDirection: 'row', flexWrap: 'wrap',alignItems:'center'}}>
                                <TextInput 

                                    keyboardType='number-pad'
                                    style={styles.input}
                                    placeholder={'????????????'}
                                    placeholderTextColor='silver'
                                    onChangeText={setMagnitude}
                                    onEndEditing={() => setValidateButton(magnitude && true)}
                                    
                                />
                            </View>
                        </View>
                        <View style={styles.section}>
                            <Text style={[styles.subTopic,{marginBottom:10}]}>??????????????????????????????????????????</Text> 
                            <DropDownPicker
                                open={tsunamiOpen}
                                value={tsunami}
                                items={ [
                                    {
                                        label: '???????????????????????????????????????',
                                        value: true
                                    },
                                    {
                                        label: '????????????????????????????????????????????????',
                                        value: false
                                    },
                                ]}
                                
                                setOpen={setTsunamiOpen}
                                setValue={setTsunami}
                                listMode="MODAL"
                                placeholder="????????????????????????????????????????????????"
                                placeholderTextColor='silver'
                                modalProps={{
                                    animationType: "slide"
                                }}

                            />
                        </View>
                    </>
                }

                {type == 'flood' && 
                <View style={styles.section}>
                    <Text style={[styles.subTopic,{marginBottom:10}]}>?????????????????????</Text> 
                    <View style={{flex: 1, flexDirection: 'row', flexWrap: 'wrap',alignItems:'center'}}>
                        <TextInput 

                            keyboardType='number-pad'
                            style={styles.input}
                            placeholder={'?????????????????????'}
                            placeholderTextColor='silver'
                            onChangeText={setDepth}
                            onEndEditing={() => setValidateButton(depth)}
                            
                        />
                    </View>
                </View>}
                

                { type == 'epidemic' && 
                <View style={styles.section}>
                    <Text style={styles.subTopic}>?????????????????????</Text> 
                    { patient.map((value,index) =>
                        <View key={index} style={styles.inputSection}>
                            <Text style={{fontSize:18,color:'dimgray'}}>{`?????????????????????????????? ${index + 1}`}</Text>
                            <View style={{flex:1,margin:10}}>
                                <Text  style={styles.textStyle}>????????????</Text>
                                <TextInput 
                                    
                                    style={styles.input2}
                                    placeholder={'????????????'}
                                    placeholderTextColor='silver'
                                    onChangeText={(text) =>  {
                                        patient[index] = {...patient[index],name: text};
                                        setPatient(patient);
                                        setValidateButton(patient[index]?.name && patient[index]?.surname && patient[index]?.symptom && text);
                                    }}
                                />
                            </View>
                            <View style={{flex:1,margin:10}}>
                                <Text  style={styles.textStyle}>?????????????????????</Text>
                                <TextInput 
                                    
                                    style={styles.input2}
                                    placeholder={'?????????????????????'}
                                    placeholderTextColor='silver'
                                    onChangeText={(text) =>  {
                                        patient[index] = {...patient[index],surname: text};
                                        setPatient(patient);
                                        setValidateButton(patient[index]?.name != '' && patient[index]?.surname != '' && patient[index]?.symptom != '' && text);
                                    }}
                                />
                            </View>
                            <View style={{flex:1,margin:10}}>
                                <Text  style={styles.textStyle}>?????????????????????????????????????????????</Text>
                                <TextInput 
                                    
                                    style={styles.input2}
                                    placeholder={'?????????????????????????????????????????????'}
                                    placeholderTextColor='silver'
                                    onChangeText={(text) =>  {
                                        patient[index] = {...patient[index],symptom: text};
                                        setPatient(patient);
                                        setValidateButton(patient[index]?.name != '' && patient[index]?.surname != '' && patient[index]?.symptom != '' && text);
                                    }}
                                    multiline={true}
                                />
                            </View>
                        </View>
                    )}
                        <TouchableOpacity style = {styles.reportbtn} onPress={() => {setValidateButton(false); addPatient();}}>
                            <Text style = {styles.reportText}>
                                    ???????????????
                            </Text>
                        </TouchableOpacity>
                        { patient.length > 1 &&
                        <TouchableOpacity style = {[styles.reportbtn,{backgroundColor:'red'}]} onPress={async () => {await removePatient()}}>
                            <Text style = {styles.reportText}>
                                    ??????
                            </Text>
                        </TouchableOpacity>}
                    </View>

                }

            



                <View style={styles.section}>
                    <Text style={styles.subTopic}>?????????????????????????????????????????????</Text>   
                    { address?.aoi ? 
                        <Text style={styles.addressText}>{address?.aoi}</Text> : null
                    }
                    <View style={{flexDirection:'row'}}>
                        <Text style={styles.addressText}>{address?.subdistrict + '  '}</Text>
                        <Text style={styles.addressText}>{address?.district}</Text>
                    </View>
                    <Text style={styles.addressText}>{address?.province}</Text>
                    <Text style={styles.addressText}>{address?.postcode}</Text>
                </View>
                <View style={styles.section}>
                    <Text style={styles.subTopic}>?????????????????????????????????????????????????????????</Text> 
                    <TextInput style={{borderWidth:1,margin:5,fontFamily: 'Mitr-Regular',color:'black'}} 
                        placeholder={'??????????????????????????????????????????????????????'}
                        placeholderTextColor='silver'
                        multiline = {true}
                        onChangeText = {(text) => {setDescription(text)}}
                    />
                    <TouchableOpacity style={styles.reportbtn} onPress={() => navigation.navigate('ImagesCollection')}>
                        <Text style={{fontSize:20,color:'white',fontFamily: 'Mitr-Bold'}}>
                            <Icon name='image' size={30}/>
                            ???????????????????????????
                        </Text>
                    </TouchableOpacity>
                </View>
            </ScrollView>

            <View opacity={(validateButtonRef.current) ? 1 : 0.5} style={{flexDirection:'row',alignItems:'center',backgroundColor: 'white'}}>
                <TouchableOpacity style = {styles.reportbtn} disabled={!validateButtonRef.current}
                onPress={ 

                    
                    async () => { 
                        willAlert('????????????????????????????????????????????????','',async () => await validateData,null,'ask')
                    }} >
                    <Text style = {styles.reportText}>
                        ?????????????????????????????????????????????
                    </Text>
                </TouchableOpacity>
            </View>
            
                

        </SafeAreaView>
      );

}

export default ValidateReportModal;

const styles = StyleSheet.create({
    container: {
      flex: 1,
    },
    topView:{
        width: '100%', 
        height: 60, 
        flexDirection: 'row',
        backgroundColor : 'seagreen',
        alignItems: 'center',
        justifyContent: 'center',
    },
    title :
    {
      fontSize : 24,
      fontFamily: 'Mitr-Bold',
    },
    iconBack : {
        position:'absolute',
        left:10
    },
    subTopic: {
        left:10,
        fontFamily: 'Mitr-Bold',
        fontSize: 18,
        color:'dimgray'
    },
    section: {
        backgroundColor:'red',
        borderBottomWidth: 1,
        borderBottomColor: 'gray',
        backgroundColor: 'white',
        margin:10,
        padding:10,
        borderRadius:10

    },
    typeButton: {
        padding:10,
        paddingLeft:20,
        paddingRight:20,
        margin:10
    },
    addressText: {
        fontSize: 16,
        color:'dimgray',
        fontFamily: 'Mitr-Regular'
    },
    button: {
        borderRadius: 20,
        padding: 10,
        elevation: 2,
        width: '80%'
    },
    buttonOpen: {
        backgroundColor: "lightblue",
    },
    reportbtn : {
        backgroundColor : 'springgreen',
        padding : 10 ,
        margin : 10,
        flex:1,
        alignItems:'center',
        borderRadius:10
    },
    reportText:{
        color:'white',
        fontSize:20,
        fontFamily: 'Mitr-Bold'
    },
    textStyle: {
        fontSize:16,
        color:'dimgray',
        marginBottom: 2,
        fontFamily: 'Mitr-Regular'
    },
    inputSection: {
        borderWidth:1,
        borderColor:'black',
        padding:10,
        marginTop:10,
        marginBottom:10,
        borderRadius:10
    },
    input: {
        flex:1,
        borderWidth:1,
        margin:5,
        color: 'black',
        fontFamily: 'Mitr-Regular'
    },
    input2: {
        borderWidth:1,
        color: 'black',
        fontFamily: 'Mitr-Regular'
    },
    selectSection: {
        flex: 1,
        flexDirection: 'row', 
        flexWrap: 'wrap',
        margin:10,
        alignItems:'center',
        justifyContent: 'center'
    },
    selectText: {
        alignSelf:'center',
        fontSize: 16,
        color: 'black',
        fontFamily: 'Mitr-Regular'
    },
    categoryText: {
        fontSize:14,
        fontFamily: 'Mitr-Regular',
        color:'black'
    }
  });