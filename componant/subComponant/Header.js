import React from 'react';
import { View , Text , StyleSheet} from 'react-native'
import Icon from 'react-native-vector-icons/Ionicons';


const Header = ({navigation,title,color,textColor='lavenderblush',goTo=''}) => {

    return(

        <View style={ [styles.topView,{backgroundColor: color}] } >
            <Icon color ='dimgray' style={ styles.iconBack } name = {'chevron-back'} size = {28} onPress={() => {(goTo) ? navigation.navigate(goTo) : navigation.goBack()}} />
            <View>
                <Text style = {[styles.title,{color:textColor}]}>{title}</Text>
            </View>
        </View>
    )
}

const styles = StyleSheet.create({
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
      fontFamily: 'Mitr-Bold'
    },
    iconBack : {
        position:'absolute',
        left:10
    }
  });

module.exports = Header;