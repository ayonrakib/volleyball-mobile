import React, {useReducer} from 'react';
import axios from 'axios';
import { View, Text, StyleSheet } from 'react-native';
import { Button, TextInput, HelperText } from 'react-native-paper';
import GetInput from '../Components/GetInput';
import styles from '../styles/styles';
import GetModal from '../screens/Modal';
import AsyncStorageLib from '@react-native-async-storage/async-storage';

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
    case "setErrorMessage":
      console.log("error message: ",action.data.errorMessage)
      return { ...stateDictionary, errorMessage: action.data.errorMessage, showErrorMessage: true};
    case "hideErrorMessage":
      return { ...stateDictionary, showErrorMessage: false};
    default:
      return stateDictionary;
  }
}

const Login = ({navigation}) => {
  // console.log("Login component loaded!")
  const [stateDictionary, dispatch] = useReducer(reducer, {email: "", password: "", visible: false, errorMessage: "", showErrorMessage: false});
  const storeData = async () => {
    try {
      await AsyncStorageLib.setItem('@name', "rakib")
    } catch (e) {
      console.error(e)
    }
  }
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


  function setErrorMessage(errorMessage){
    dispatch({name: "setErrorMessage", data: { errorMessage : errorMessage }});
  }


  function hideErrorMessage(){
    dispatch({name: "hideErrorMessage", data: { showErrorMessage : false }});
  }

// login method
// input: nothing
// return: nothing
// method:
//    1. send a post request to backend with email and password input
//    2. if response is error message:
//      2.1. save that error message in state var and show it in modal
//    3. if authentic user:
//      3.1. save session from response in react native storage lib
  function login(){
      axios({
        method: "post",
        url:"http://192.168.1.88:8080/login-mariadb",
        data: stateDictionary
      }).then(response => {
        console.log("the response is: ",response.data)
        if(response.data.data === false){
          setErrorMessage(response.data.error.errorMessage)
        }
        else{
          hideErrorMessage()
        }
        storeData();
      }).catch(error => console.log(error))
      const getData = async () => {
        try {
          const values = await AsyncStorageLib.getAllKeys()
          if(values !== null) {
            // value previously stored
            console.log("async storage value is: ",values)
          }
          else{
            console.log("null storage: ",values)
          }
        } catch(e) {
          // error reading value
          console.error(e)
        }
      }
      getData()
  }


  return(
        <View style={styles.form}>
          <HelperText type="error" visible={stateDictionary.showErrorMessage} style={{display: "flex", alignSelf: "center"}}>
            {stateDictionary.errorMessage}
          </HelperText>
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