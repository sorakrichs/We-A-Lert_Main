import React from 'react';
import { TextInput } from 'react-native'
import {thaiIDValidator} from '../../controllers/miscControllers'

const Input = ({pattern, onChangeText, onValidation,style,children,keyboardType,placeholder,underlineColorAndroid,isID,checkCase,value,multiline=false,secureTextEntry=false}) =>
  {
    const HandleValidation = (value) =>
    {

        switch(checkCase){
          case('id'):
            return thaiIDValidator(value);
          break;
          case('confirm'):
            return pattern == value;
          break;
          default:

        }
        if(!pattern) return true;
        if(typeof pattern === 'string')
        {
        const condition = new RegExp(pattern, 'g');
        return condition.test(value);
        }
        if (typeof pattern === 'object') {
        const conditions = pattern.map(rule => new RegExp(rule, 'g'));
        return conditions.map(condition => condition.test(value));
        }
    }
    const onChange = (value) =>
    {
        const isValid =  HandleValidation(value);
        onValidation && onValidation(isValid);
        onChangeText && onChangeText(value);
    }

    const Type = () => {
      setButton(true)
    }

    return(
        <TextInput
            style={style}
            onChangeText={value => onChange(value)}
            placeholder = {placeholder}
            placeholderTextColor='silver'
            keyboardType = {keyboardType}
            value = {value}
            multiline = {multiline}
            secureTextEntry = {secureTextEntry}
        >
        {children}
        </TextInput>
    )
  }

export default Input;