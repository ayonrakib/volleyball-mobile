import React, {useReducer} from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { Button, TextInput } from 'react-native-paper';
import GetInput from '../Components/GetInput';
import styles from '../styles/styles';

function reducer(stateDictionary, action){
  console.log("came in reducer method of Login component!");
  // console.log("action is: ",action)
  // console.log("stateDictionary is: ",stateDictionary)
  switch(action.name){
    case "setEmail":
      console.log("activated set email")
      return { ...stateDictionary, email: action.data.email }
    case "setPassword":
      console.log("activated set password")
      return { ...stateDictionary, password: action.data.password }
    default:
      return stateDictionary;
  }
}

const Login = ({navigation}) => {
  const [stateDictionary, dispatch] = useReducer(reducer, {email: "", password: ""});
  
  function seeEmailValue(){
    console.log("email value is: ",stateDictionary)
  }

  function seePasswordValue(){
    console.log("password value is: ",stateDictionary.password)
  }
  return(
        <View style={styles.form}>
          <GetInput label="Email" secureTextEntry={false} value={stateDictionary.email} setText={dispatch} textToChange="email" action="setEmail"/>
          <GetInput label="Password" secureTextEntry={true} value={stateDictionary.password} setText={dispatch} textToChange="password" action="setPassword"/>
          <View style={styles.buttonRow}>
            <Button style={styles.buttonStyle} mode='contained' onPress={seeEmailValue}>Login</Button>
            <Button style={styles.buttonStyle} mode='contained' onPress={() => navigation.navigate('Register')}>Register</Button>
          </View>
        </View>
    ) 
};

export default Login;