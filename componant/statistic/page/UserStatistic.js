import React, { useState , useMemo, useRef,useCallback, memo} from 'react';
import {
    View,
    Text,
    NativeModules,
    LayoutAnimation,
    Pressable,
    SafeAreaView,
    Button,
    StyleSheet,
    TouchableHighlight,
    Dimensions,
    TouchableOpacity,
    TextInput,
    ScrollView
    } from 'react-native';

import {
  LineChart,
  BarChart,
  PieChart,
  ProgressChart,
  ContributionGraph,
  StackedBarChart
} from "react-native-chart-kit";

import {getUserReportStatistic} from '../../../controllers/reportControllers'
import Header from '../../subComponant/Header'
import {BottomSheetModal} from '@gorhom/bottom-sheet';
import { useAlert } from '../../../providers/AlertProvider';
import { useAuth } from '../../../providers/AuthProvider';




const UserStatistic = ({navigation}) => {

  const [data,setData] = useState(null);
  const {willAlert} = useAlert();
  const {session} = useAuth();
  const [type,setType] = useState({day:'all',month:'all'})
  const [province,setProvince] = useState('')

  useMemo(async () => {

    try {
      let statisticData = await getUserReportStatistic(session.id);
      let statistic = {};
      if(statisticData[0]) {
        statistic.reportCount = [
          {
            name: "อุบัติเหตุรถยนต์",
            population: statisticData[0].car,
            color: "gray",
            legendFontColor: "dimgray",
            legendFontSize: 13,
            legendFontFamily:'Mitr-Regular',
          },
          {
            name: "ไฟไหม้",
            population: statisticData[0].fire,
            color: "red",
            legendFontColor: "dimgray",
            legendFontSize: 13,
            legendFontFamily:'Mitr-Regular',
          },
          {
            name: "น้ำท่วม",
            population: statisticData[0].flood,
            color: "blue",
            legendFontColor: "dimgray",
            legendFontSize: 13,
            legendFontFamily:'Mitr-Regular',
          },
          {
            name: "แผ่นดินไหว",
            population: statisticData[0].earthquake,
            color: "brown",
            legendFontColor: "dimgray",
            legendFontSize: 13,
            legendFontFamily:'Mitr-Regular',
          },
          {
            name: "โรคระบาด",
            population: statisticData[0].epidemic,
            color: "green",
            legendFontColor: "dimgray",
            legendFontSize: 13,
            legendFontFamily:'Mitr-Regular',
          }
        ];
        statistic.reportCount.sort((a,b) => (a.population < b.population) ? 1 : ((b.population < a.population) ? -1 : 0));
      }
      if(statisticData[1]) {
        statistic.validateCount = [
          {
            name: "อุบัติเหตุรถยนต์",
            population: statisticData[1].car,
            color: "gray",
            legendFontColor: "dimgray",
            legendFontSize: 13,
            legendFontFamily:'Mitr-Regular',
          },
          {
            name: "ไฟไหม้",
            population: statisticData[1].fire,
            color: "red",
            legendFontColor: "dimgray",
            legendFontSize: 13,
            legendFontFamily:'Mitr-Regular',
          },
          {
            name: "น้ำท่วม",
            population: statisticData[1].flood,
            color: "blue",
            legendFontColor: "dimgray",
            legendFontSize: 13,
            legendFontFamily:'Mitr-Regular',
          },
          {
            name: "แผ่นดินไหว",
            population: statisticData[1].earthquake,
            color: "brown",
            legendFontColor: "dimgray",
            legendFontSize: 13,
            legendFontFamily:'Mitr-Regular',
          },
          {
            name: "โรคระบาด",
            population: statisticData[1].epidemic,
            color: "green",
            legendFontColor: "dimgray",
            legendFontSize: 13,
            legendFontFamily:'Mitr-Regular',
          }
        ];
        statistic.validateCount.sort((a,b) => (a.population < b.population) ? 1 : ((b.population < a.population) ? -1 : 0));
      }

      if(statisticData[2].length > 0 && statisticData[3].length > 0) {
      statistic.date = {
        day : {
          all:{
            labels:[],datasets: [{data: []}]  
          },
          car:{
            labels:[],datasets: [{data: []}]  
          },
          fire:{
            labels:[],datasets: [{data: []}]  
          },
          flood:{
            labels:[],datasets: [{data: []}]  
          },
          earthquake:{
            labels:[],datasets: [{data: []}]  
          },
          epidemic:{
            labels:[],datasets: [{data: []}]  
          }
        },
        month : {
          all:{
            labels:[],datasets: [{data: []}]  
          },
          car:{
            labels:[],datasets: [{data: []}]  
          },
          fire:{
            labels:[],datasets: [{data: []}]  
          },
          flood:{
            labels:[],datasets: [{data: []}]  
          },
          earthquake:{
            labels:[],datasets: [{data: []}]  
          },
          epidemic:{
            labels:[],datasets: [{data: []}]  
          }
        }
      }

      statistic.date.day.all.labels = statisticData[2].map((value) => value._id)
      statistic.date.day.all.datasets[0].data = statisticData[2].map((value) => value.car + value.fire + value.flood + value.earthquake + value.epidemic)
      statistic.date.day.car.labels = statisticData[2].map((value) => value._id)
      statistic.date.day.car.datasets[0].data = statisticData[2].map((value) => value.car)
      statistic.date.day.fire.labels = statisticData[2].map((value) => value._id)
      statistic.date.day.fire.datasets[0].data = statisticData[2].map((value) => value.fire)
      statistic.date.day.flood.labels = statisticData[2].map((value) => value._id)
      statistic.date.day.flood.datasets[0].data = statisticData[2].map((value) => value.flood)
      statistic.date.day.earthquake.labels = statisticData[2].map((value) => value._id)
      statistic.date.day.earthquake.datasets[0].data = statisticData[2].map((value) => value.earthquake)
      statistic.date.day.epidemic.labels = statisticData[2].map((value) => value._id)
      statistic.date.day.epidemic.datasets[0].data = statisticData[2].map((value) => value.epidemic)

      statistic.date.month.all.labels = statisticData[3].map((value) => value._id)
      statistic.date.month.all.datasets[0].data = statisticData[3].map((value) => value.car + value.fire + value.flood + value.earthquake + value.epidemic)
      statistic.date.month.car.labels = statisticData[3].map((value) => value._id)
      statistic.date.month.car.datasets[0].data = statisticData[3].map((value) => value.car)
      statistic.date.month.fire.labels = statisticData[3].map((value) => value._id)
      statistic.date.month.fire.datasets[0].data = statisticData[3].map((value) => value.fire)
      statistic.date.month.flood.labels = statisticData[3].map((value) => value._id)
      statistic.date.month.flood.datasets[0].data = statisticData[3].map((value) => value.flood)
      statistic.date.month.earthquake.labels = statisticData[3].map((value) => value._id)
      statistic.date.month.earthquake.datasets[0].data = statisticData[3].map((value) => value.earthquake)
      statistic.date.month.epidemic.labels = statisticData[3].map((value) => value._id)
      statistic.date.month.epidemic.datasets[0].data = statisticData[3].map((value) => value.epidemic)
      setProvince(statisticData[2][0].province)
    }

      setData(statistic);
    } catch(err) {
      willAlert('เกิดปัญหาขึ้น',(err?.response?.data?.message) ? err?.response?.data?.message : err?.message)
    }
  },[]);
  
    return (
      <SafeAreaView style={styles.container}>
        <Header
            navigation={navigation}
            title = {'สถิติ'}
            color = {'chocolate'}
            goTo = {'Map'}
        />  
        { data && 
          <ScrollView>
            
            {data.reportCount && <View style={styles.section}>
              <Text style={styles.topic}>จำนวนภัยพิบัติที่รายงาน</Text>
              <PieChart
              data={data.reportCount}
              width={Dimensions.get("window").width * 0.9 } // from react-native
              height={200}
              chartConfig={{
                backgroundGradientFrom: "#fb8c00",
                backgroundGradientTo: "#ffa726",
                decimalPlaces: 2, // optional, defaults to 2dp
                color: (opacity = 1) => `rgba(255, 255, 255, ${opacity})`,
                labelColor: (opacity = 1) => `rgba(255, 255, 255, ${opacity})`,
                style:{
                  fontFamily:'Mitr-Regular',
                },
                

              }}
              accessor={"population"}
              
              style={{
                marginVertical: 8,
                borderRadius: 32,
                backgroundColor:'seashell',
                
              }}
              />
              <Text style={styles.resultText}>{`จากทั้งหมด ${data.reportCount.map(item => item.population).reduce((prev, next) => prev + next)} การรายงาน`}</Text>
            </View>
            }
            {data.validateCount && 
            <View style={styles.section}>
              <Text style={styles.topic}>จำนวนภัยพิบัติที่ยืนยัน</Text>
              <PieChart
              data={data.validateCount}
              width={Dimensions.get("window").width * 0.9 } // from react-native
              height={200}
              chartConfig={{
                backgroundGradientFrom: "#fb8c00",
                backgroundGradientTo: "#ffa726",
                decimalPlaces: 2, // optional, defaults to 2dp
                color: (opacity = 1) => `rgba(255, 255, 255, ${opacity})`,
                labelColor: (opacity = 1) => `rgba(255, 255, 255, ${opacity})`,
                style:{
                  fontFamily:'Mitr-Regular',
                },
                

              }}
              accessor={"population"}
              
              style={{
                marginVertical: 8,
                borderRadius: 32,
                backgroundColor:'seashell',
                
              }}
              />
              <Text style={styles.resultText}>{`จากทั้งหมด ${data.validateCount.map(item => item.population).reduce((prev, next) => prev + next)} การรายงาน`}</Text>
            </View>
            }

            {data.date && <View style={styles.section}>
              <Text style={styles.topic}>จำนวนภัยพิบัติที่เกิดขึ้นในแต่ละวัน</Text>
              <Text style={styles.topic}>{`ใน ${province}`}</Text>
              <View style={{flexDirection:'row',alignSelf:'center',margin:10}}>
                <Button
                  title= {`ทั้งหมด`}
                  onPress={() => setType({...type,day:'all'})}
                />
                <Button
                  title= {`อุบัติเหตุรถยนต์`}
                  onPress={() => setType({...type,day:'car'})}
                  color='gray'
                />
                <Button
                  title= {`ไฟไหม้`}
                  onPress={() => setType({...type,day:'fire'})}
                  color='red'
                />
              </View>

              <View style={{flexDirection:'row',alignSelf:'center',margin:10}}>
                <Button
                  title= {`น้ำท่วม`}
                  onPress={() => setType({...type,day:'flood'})}
                  color='blue'
                />
                <Button
                  title= {`แผ่นดินไหว`}
                  onPress={() => setType({...type,day:'earthquake'})}
                  color='brown'
                />
                <Button
                  title= {`โรคระบาด`}
                  onPress={() => setType({...type,day:'epidemic'})}
                  color='green'
                />
              </View>

              <BarChart

                data={
                  (type.day == 'car') ? data.date.day.car : 
                  (type.day == 'fire') ? data.date.day.fire :
                  (type.day == 'flood') ? data.date.day.flood :  
                  (type.day == 'earthquake') ? data.date.day.earthquake :  
                  (type.day == 'epidemic') ? data.date.day.epidemic :  
                  data.date.day.all
                }
                width={Dimensions.get("window").width * 0.9 }
                height={400}
                chartConfig={{
                  backgroundGradientFrom: "#fffffa",
                  backgroundGradientTo: "#ffffff",
                  decimalPlaces: 0,
                  color: (opacity = 1) => {
                    switch(type.day) {
                      
                      case('fire'):
                        return `rgba(255, 0, 0, ${opacity})`
                      break;
                      case('flood'):
                        return `rgba(0, 0, 255, ${opacity})`
                      break;
                      case('earthquake'):
                        return `rgba(139, 45, 13, ${opacity})`
                      break;
                      case('epidemic'):
                        return `rgba(46, 139, 57, ${opacity})`
                      break;
                      default:
                        return `rgba(0, 0, 0, ${opacity})`
                    }

                  },
                  labelColor: (opacity = 1) => `rgba(0, 0, 0, ${opacity})`,
                  barPercentage: 0.2,
                  propsForVerticalLabels: {fontFamily:'Mitr-Regular',fontSize:8}
                }}
                fromZero = {true}
                showValuesOnTopOfBars = {true}
                verticalLabelRotation={90}
              
              style={{
                marginVertical: 8,
                
              }}
              />
            </View>}
            {data.date &&<View style={styles.section}>
              <Text style={styles.topic}>จำนวนภัยพิบัติที่เกิดขึ้นในแต่ละเดือน</Text>
              <Text style={styles.topic}>{`ใน ${province}`}</Text>
              <View style={{flexDirection:'row',alignSelf:'center',margin:10}}>
                <Button
                  title= {`ทั้งหมด`}
                  onPress={() => setType({...type,month:'all'})}
                />
                <Button
                  title= {`อุบัติเหตุรถยนต์`}
                  onPress={() => setType({...type,month:'car'})}
                  color='gray'
                />
                <Button
                  title= {`ไฟไหม้`}
                  onPress={() => setType({...type,month:'fire'})}
                  color='red'
                />
              </View>

              <View style={{flexDirection:'row',alignSelf:'center',margin:10}}>
                <Button
                  title= {`น้ำท่วม`}
                  onPress={() => setType({...type,month:'flood'})}
                  color='blue'
                />
                <Button
                  title= {`แผ่นดินไหว`}
                  onPress={() => setType({...type,month:'earthquake'})}
                  color='brown'
                />
                <Button
                  title= {`โรคระบาด`}
                  onPress={() => setType({...type,month:'epidemic'})}
                  color='green'
                />
              </View>

              <BarChart

                data={
                  (type.month == 'car') ? data.date.month.car : 
                  (type.month == 'fire') ? data.date.month.fire :
                  (type.month == 'flood') ? data.date.month.flood :  
                  (type.month == 'earthquake') ? data.date.month.earthquake :  
                  (type.month == 'epidemic') ? data.date.month.epidemic :  
                  data.date.month.all
                }
                width={Dimensions.get("window").width * 0.9 }
                height={400}
                chartConfig={{
                  backgroundGradientFrom: "#fffffa",
                  backgroundGradientTo: "#ffffff",
                  decimalPlaces: 0,
                  color: (opacity = 1) => {
                    switch(type.month) {
                      
                      case('fire'):
                        return `rgba(255, 0, 0, ${opacity})`
                      break;
                      case('flood'):
                        return `rgba(0, 0, 255, ${opacity})`
                      break;
                      case('earthquake'):
                        return `rgba(139, 45, 13, ${opacity})`
                      break;
                      case('epidemic'):
                        return `rgba(46, 139, 57, ${opacity})`
                      break;
                      default:
                        return `rgba(0, 0, 0, ${opacity})`
                    }

                  },
                  labelColor: (opacity = 1) => `rgba(0, 0, 0, ${opacity})`,
                  barPercentage: 0.2,
                  propsForVerticalLabels: {fontFamily:'Mitr-Regular',fontSize:8}
                }}
                fromZero = {true}
                showValuesOnTopOfBars = {true}
                verticalLabelRotation={90}
              
              style={{
                marginVertical: 8,
                
              }}
              />
            </View>}
        </ScrollView>
      }
    </SafeAreaView>
    );


}

const styles = StyleSheet.create({
  container: {
      flex: 1,
      alignItems: 'center',
  },
  section: {
      backgroundColor:'seashell',
      margin:10,
      padding:5,
      borderRadius: 32,
      borderWidth:1,
      alignItems:'center'
      

  },
  topic: {
    fontSize:18,
    color:'black',
    fontFamily: 'Mitr-Bold'
  },
  resultText: {
    fontSize:16,
    color:'black',
    fontFamily: 'Mitr-Regular'
  }
});

export default UserStatistic;