import React, { useState , useEffect, useMemo,useCallback,forwardRef,useRef} from 'react';
import {
    SafeAreaView,
    TextInput,
    StyleSheet,
    Text,
    Image,
    View,
    TouchableOpacity,
    SectionList,
    ScrollView
  } from 'react-native';
import {findPlace} from '../../controllers/mapControllers'
import {useMap} from '../../providers/MapProvider'
import { BottomSheetSectionList ,BottomSheetModal } from '@gorhom/bottom-sheet';
import memoize from "fast-memoize";
import { base64Marker } from '../../assets/images';
import Icon from 'react-native-vector-icons/Ionicons';
import LoadingScreen from '../misc/LoadingScreen'

const ExploreSceen = forwardRef(({enablePanDownToClose,snapPoints,index,location,setLoading},ref) => {

  const [prevIndex,_setPrevIndex] = useState(-1);
  const prevIndexRef = useRef(prevIndex);
    const setPrevIndex = data => {
      prevIndexRef.current = data;
      _setPrevIndex(data);
  };
  const [places,setPlaces] =useState([]);
  const [selPlace,setSelPlace] = useState(null);
  const [page,setPage] = useState('');
  const [tag,setTag] = useState('');
  const [open,setOpen] = useState(false);
  const {map,setExploreMarker,reloadPin,setYourLocationPin,routing,setIsFocus} = useMap();


  const loadExpolorePin = async () => {
    setPlaces([]);
    setLoading(true)
    await findPlace(location,tag).then(async (places) => {

      map.current.call('Route.clear');
      setPlaces(places.data);
      await Promise.all(
        places.data.map((place) => {
          setExploreMarker(place,tag);

        })
      );

    })
    setLoading(false)

  }


  useEffect(() => {

    let active = true;
    load()
    return () => {active = false}

    async function load() {

      setLoading(true)
      if(location?.lat && location?.lon && active && open) {
        await loadExpolorePin();
        setIsFocus(false);
        setYourLocationPin(location);
      }
      setLoading(false)


    }

  }, [tag]);

  const handleSheetChange = useCallback( async (index) => {
    setLoading(true)
    switch(index) {
      case(1): 
        if(prevIndexRef.current < 0) {
          map.current.call('Route.clear');
          map.current.call('Overlays.clear');
          setOpen(true);
        }
        break;
      case(-1):
        await map.current.call('Overlays.clear')
        await reloadPin()
        setPage('');
        setTag('');
        setOpen(false);
      break;
    }

    setPrevIndex(index);
    setLoading(false)

  },[])


  const changeTag = useCallback(memoize((tag) => {

    map.current.call('Overlays.clear')
    setTag(tag);

  }),[])


  const Item = ({place}) => {
    return (
      <TouchableOpacity style={{padding:5,borderWidth:1}} onPress={() => getPlace(place)}>
        <Text style={styles.textStyle}> {place.name} </Text>
        <Text style={styles.textStyle}> {place.distance} </Text>
      </TouchableOpacity>
    );
  };

  const getPlace = (place) => {
      ref.current.snapToIndex(0);
      routing(place.id);
      setPage('detail');
      setSelPlace(place);
      map.current.call('location',place);

  }

  const DATA = [
    {
      data: places.map(item => item),
    },
  ];

  const ItemSeparatorView = () => {
    return (
      // Flat List Item Separator
      <View
        style={{
          height: 5,
          marginHorizontal: 12,
        }}
      />
    );
  }

  const renderSectionHeader = useCallback((tag) =>  (
    <View>
      <View style={{alignItems:'center',borderBottomWidth:1,marginBottom:5}}>
          <Text style={{color:'black',fontSize:36,fontFamily: 'Mitr-Bold'}}>สำรวจ</Text>
      </View>
      <View style={{flexDirection: 'row',paddingBottom:5,alignItems: 'center',
    flex: 1,
    justifyContent: 'center'}}>
        <TouchableOpacity style = {{alignItems:'center',opacity:(tag === 'สถานพยาบาล')? 0.5:1 }} onPress={() => changeTag('สถานพยาบาล')} disabled={(tag === 'สถานพยาบาล') ? true:false}>
          <Image
            style = {{width :50 , height : 50}}
            source = {require('../../assets/explore/redCross.png')}/>
            <Text style={styles.textStyle}> โรงพยาบาล</Text>
        </TouchableOpacity>
        <TouchableOpacity style = {{alignItems:'center',margin: 5,padding:5,opacity:(tag === 'ตำรวจ')? 0.5:1 }} onPress={() => changeTag('ตำรวจ')} disabled={(tag === 'ตำรวจ') ? true:false}>
          <Image
            style = {{width :50 , height : 50}}
            source = {require('../../assets/explore/police.png')}/>
            <Text style={styles.textStyle}> ตำรวจ </Text>
        </TouchableOpacity>
      </View>
      </View>
    ),
    []
  );

  return (
    <View>
    <BottomSheetModal
            ref={ref}
            index={index}
            enablePanDownToClose={enablePanDownToClose}
            snapPoints={snapPoints}
            onChange={handleSheetChange}
            >
    { page === '' ?
            <BottomSheetSectionList
                sections={DATA}
                scrollEnabled
                keyExtractor={(item, index) => item + index}
                ItemSeparatorComponent={ItemSeparatorView}
                renderSectionHeader={() => renderSectionHeader(tag)}
                renderItem={({item}) => <Item place={item} />} />  : 
                
            <SafeAreaView>
              <View style={ styles.topView } >
                <Icon style={ styles.iconBack } name = {'chevron-back'} size = {28} onPress={async () => {setPage(''); await loadExpolorePin();}} />
                <Text style={{textAlign:'center',fontSize:26,fontFamily: 'Mitr-Bold',width: "60%",color:'black'}}> {selPlace.name} </Text> 
              </View>
              <Text style={styles.detailText}> {selPlace.address} </Text> 
              <Text style={styles.detailText}> หมายเลขโทรศัพท์: {(selPlace.tel) ? selPlace.tel : 'ไม่มี'} </Text> 
            </SafeAreaView>
      }
      </BottomSheetModal>
      {<LoadingScreen/>}
      </View>
    );

    
});

module.exports = ExploreSceen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    justifyContent: 'center',
  },
  buttonBack: {
    marginVertical: 12,
    marginHorizontal: 10,
    height: 40,
  },
  textStyle: {
    color: "black",
    fontFamily: 'Mitr-Regular'
  },
  topView:{
      width: '100%', 
      height: '30%',
      flexDirection: 'row',
      backgroundColor : 'aquamarine',
      alignItems: 'center',
      justifyContent: 'center',
      marginBottom: 30
  },
  iconBack : {
    position:'absolute',
    left:10
  },
  detailText: {
    textAlign:'center',
    fontSize:18,
    color:'black',
    fontFamily: 'Mitr-Regular'
  }
});