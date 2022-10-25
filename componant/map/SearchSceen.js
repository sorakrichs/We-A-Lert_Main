import React, { useState , useEffect, useMemo,useRef,useCallback} from 'react';
import {
    SafeAreaView,
    TextInput,
    StyleSheet,
    Text,
    View,
    Button,
    TouchableOpacity,
    SectionList,
  } from 'react-native';
import { useMap } from '../../providers/MapProvider';
import {useAlert} from '../../providers/AlertProvider'
import {base64Marker} from '../../assets/images'



const SearchScreen = ({route,navigation}) => {
    const {setSearchLocationPin} = useMap();
    const {keyAPI,Longdo} = useMap();
    const {willAlert} = useAlert();
    const ItemSeparatorView = () => {
        return (
          // Flat List Item Separator
          <View
            style={{
              height: 1,
              backgroundColor: '#C8C8C8',
              marginHorizontal: 12,
            }}
          />
        );
      };
  
    const [search, setSearch] = useState('');
    const [filteredDataSource, setFilteredDataSource] = useState([]);

    const Item = ({title}) => {
        return (
          <View>
            <Text style={styles.textSuggest} onPress={() => getItem(title)}>
              {title}
            </Text>
          </View>
        );
      };

    const DATA = [
        {
          data: filteredDataSource.map(item => item.w),
        },
      ];

      const getItem = item => {
        const urlSearch =
          'https://search.longdo.com/mapsearch/json/search?limit=20&key=' +
          keyAPI +
          '&keyword=' +
          item;
        fetch(urlSearch)
          .then(res => res.json())
          .then(resJson => {

            setSearchLocationPin(resJson.data[0])
            navigation.navigate('Map');
            willAlert('ข้อมูลสถานที่',{
              name:resJson.data[0].name,
              address: resJson.data[0].address
            },
            () => {}
            ,null,'location');
          })
          .catch(error => {
            willAlert('เกิดข้อผิดพลาด',error.message);
          });
      };
      
    const searchFilterFunction = text => {
        if (text.length >= 3) {
          const urlSuggest =
            'https://search.longdo.com/mapsearch/json/suggest?limit=100&key=' +
            keyAPI +
            '&keyword=' +
            text;
          fetch(urlSuggest)
            .then(res => res.json())
            .then(resJson => {
              setFilteredDataSource(resJson.data);
            })
            .catch(error => {
              willAlert('เกิดข้อผิดพลาด',error.message);
            });
          setSearch(text);
        } else {
          setFilteredDataSource([]);
          setSearch(text);
        }
      };
  
    return (
      <SafeAreaView style={{ flex: 1 }}>
        <View style={{flexDirection: 'row'}}>
          <TouchableOpacity style={styles.buttonBack}>
            <Button title="Back" onPress={() => navigation.navigate('Map')} />
          </TouchableOpacity>
          <TextInput
            style={styles.inputSearch}
            placeholder="ค้นหาสถานที่"
            placeholderTextColor='silver'
            onChangeText={text => searchFilterFunction(text)}
            autoFocus
            value={search}
          />
        </View>
        <SectionList
            sections={DATA}
            keyExtractor={(item, index) => item + index}
            contentContainerStyle={{ paddingHorizontal: 10 }}
            ItemSeparatorComponent={ItemSeparatorView}
            maxToRenderPerBatch={2}
            onEndReachedThreshold={0.5}
            stickySectionHeadersEnabled={false}
            renderItem={({item}) => <Item title={item} />}
        />
      </SafeAreaView>
    );
  }

  module.exports = SearchScreen;

  const styles = StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: '#fff',
      justifyContent: 'center',
    },
    input: {
      height: 40,
      margin: 12,
      borderWidth: 1,
      padding: 10,
      backgroundColor: '#fff',
      zIndex: 10,
      fontFamily: 'Mitr-Regular'
    },
    buttonBack: {
      marginVertical: 12,
      marginHorizontal: 10,
      height: 40,
    },
    inputSearch: {
      flex: 6,
      height: 40,
      marginRight: 12,
      marginTop: 12,
      borderWidth: 1,
      padding: 10,
      backgroundColor: '#fff',
      zIndex: 10,
      color:'black',
      fontFamily: 'Mitr-Regular'
    },
    textSuggest: {
      paddingHorizontal: 20,
      paddingVertical: 10,
      marginHorizontal: 12,
      backgroundColor: 'white',
      color:'black',
      fontFamily: 'Mitr-Regular'
    },
  });