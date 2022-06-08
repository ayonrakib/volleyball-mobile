import React, {useReducer} from 'react';
import axios from 'axios';
import { View, Text, StyleSheet } from 'react-native';
import { Button, TextInput } from 'react-native-paper';
import GetInput from '../Components/GetInput';
import styles from '../styles/styles';
import GetModal from '../screens/Modal';

function reducer(stateDictionary, action){
  // console.log("came in reducer method of Login component!");
  // console.log("action is: ",action)
  // console.log("stateDictionary is: ",stateDictionary)
  switch(action.name){
    case "setEmail":
      console.log("activated set email")
      return { ...stateDictionary, email: action.data.email }
    case "setPassword":
      console.log("activated set password")
      return { ...stateDictionary, password: action.data.password }
    case "showModal":
      console.log("showing modal by value of visible: ",action.data.visible);
      return stateDictionary;
    case "hideModal":
      console.log("Hiding Modal by value of visible: ",action.data.visible);
      return stateDictionary;
    default:
      return stateDictionary;
  }
}

const Login = ({navigation}) => {
  // console.log("Login component loaded!")
  const [stateDictionary, dispatch] = useReducer(reducer, {email: "", password: "", visible: false});
  
  function seeEmailValue(){
    console.log("email value is: ",stateDictionary)
  }


  function seePasswordValue(){
    console.log("password value is: ",stateDictionary.password)
  }


  function showModal(){
    dispatch({name: "showModal", data : { visible : true }});
  }


  function hideModal(){
    dispatch({name: "hideModal", data: { visible : false }});
  }


  function login(){
      axios({
        method: "post",
        url:"http://192.168.1.88:8080/login-mariadb",
        data: stateDictionary
      }).then(response => {
        console.log("the users are: ",response.data)
      }).catch(error => console.log(error))
  }


  return(
        <View style={styles.form}>
          <GetInput label="Email" secureTextEntry={false} value={stateDictionary.email} setText={dispatch} textToChange="email" action="setEmail"/>
          <GetInput label="Password" secureTextEntry={true} value={stateDictionary.password} setText={dispatch} textToChange="password" action="setPassword"/>
          <View style={styles.buttonRow}>
            <Button style={styles.buttonStyle} mode='contained' onPress={login}>Login</Button>
            <Button style={styles.buttonStyle} mode='contained' onPress={() => navigation.navigate('Register')}>Register</Button>
          </View>
          <View style={styles.buttonRow}>
            <GetModal/>
          </View>
          <Button onPress={showModal}>Show Modal!</Button>
          <Button onPress={hideModal}>Hide Modal!</Button>
        </View>
    ) 
};

export default Login;