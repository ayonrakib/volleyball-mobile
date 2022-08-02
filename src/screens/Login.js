import React, {useReducer, useEffect} from 'react';
import axios from 'axios';
import { View, Text, StyleSheet } from 'react-native';
import { Button, TextInput, HelperText } from 'react-native-paper';
import GetInput from '../Components/GetInput';
import styles from '../styles/styles';
import GetModal from '../screens/Modal';
import AsyncStorageLib from '@react-native-async-storage/async-storage';
import Homepage from './Homepage';
import HomeScreen from './HomeScreen';
import {userService}  from '../service/UserService';
var _ = require('lodash');

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
    case "reloadComponent":
      console.log("came into reloadComponent of dispatch!")
      return { ...stateDictionary, reloadComponent: true};
    case "clearCredentials":
      console.log("came inside clear credentials of dispatch in Login!");
      return { ...stateDictionary, email : "", password : "" }
    default:
      return stateDictionary;

  }
}


// login method
// input: nothing
// return: nothing
// method:
//    1. if a cookie is present:
//      1.1. validate if the cookie is authentic
//      1.2. if authentic:
//        1.2.1. redirect to home page
//      1.3. if not:
//        1.3.1. delete cookie
//    1. send a post request to backend with email and password input
//    2. if response is error message:
//      2.1. save that error message in state var and show it in helper text
//      2.2. delete cookie
//    3. if authentic user:
//      3.1. save session from response in react native storage lib
//      3.2. redirect to home page


// task: if cookie present, validate. if validated, redirect to homepage. if not, delete cookie.

// handle login:
// 1. call user login which returns a promise
// 2. attach a handler to promise which creates a dispatch if login is successful

console.log("userService object is: ",userService)
const Login = ({navigation}) => {
  console.log("Login component loaded!")
  useEffect(async ()=>{
    console.log("came inside useeffect of login method!")
    const isUserLoggedIn = await userService.isLoggedIn();
    console.log("is user logged in response from userservice in useeffect: ",isUserLoggedIn);

    if (isUserLoggedIn !== undefined) {
      
      if (isUserLoggedIn.data.data) {
    
        console.log("user authenticated in useeffect of login!")
        navigation.navigate("HomeScreen")
  
      } else {
  
        userService.deleteSession();
        dispatch( {name: "clearCredentials",data:""})
  
      }

    }
  }, []
)
  

  const [stateDictionary, dispatch] = useReducer(reducer, {email: "", password: "", visible: false, errorMessage: "", showErrorMessage: false, reloadComponent: false});
  // const storeData = async (session) => {
  //   console.log("came into store data method!")
  //   try {
  //     await AsyncStorageLib.setItem(authenticationObject['session'], session)
  //   } catch (e) {
  //     console.error(e)
  //   }
  // }

  // const removeSessionFromCookie = async() => {
  //   console.log("came into remove session method!")
  //   await AsyncStorageLib.removeItem("@name");
  // }


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


  // function login(){
  //   console.log("came in login method!")
  //     axios({
  //       method: "post",
  //       url:"http://192.168.1.88:8080/login-mariadb",
  //       data: stateDictionary
  //     }).then(response => {
  //       console.log("the response is: ",response.data)
  //       if(response.data.data === false){
  //         setErrorMessage(response.data.error.errorMessage)

  //         removeSessionFromCookie()
  //         getData()
  //       }
  //       else{
  //         console.log("session saved in for the user logged in is:",response.data.data)
  //         hideErrorMessage();
  //         storeData(response.data.data);
  //         dispatch({name: "reloadComponent", data: { reloadComponent : true }})
  //         getData();
  //         // if(response.data.data !== false){
  //         //   navigation.navigate('Homepage')
  //         // }
  //       }
        
  //     }).catch(error => console.log(error))
  // }

  // perform login
  // input: nothing
  // return: nothing, just perform login
  // method:
  //    1. call user service login method with state dict
  //    2. if false returned:
  //      2.1. delete session from react native async storage
  //      2.2. show error message 
  //    3. else:
  //      3.1. hide error message
  //      3.2. call dispatch to reload login component
  async function performLogin(){
    let isUserLoggedIn = await userService.login(stateDictionary.email, stateDictionary.password);
    console.log("return from userservce.login: ",isUserLoggedIn)
    // if(!(isUserLoggedIn.data)){
    //   userService.deleteSession();
    //   setErrorMessage(isUserLoggedIn.error.errorMessage);
    // }
    // else{
    //   dispatch({ name : "reloadComponent" , data : { reloadComponent : true }});
    // }
    console.log("user service login method response in login component is: ", isUserLoggedIn)

    if (isUserLoggedIn.data) {
      console.log("isUserLoggedIn.data in performLogin method: ",isUserLoggedIn.data)
      hideErrorMessage();
      dispatch( {name : "reloadComponent" , data : { reloadComponent : true }} )

    } else {
      console.log("isUserLoggedIn.data in performLogin method: ",isUserLoggedIn.data)
      console.log("isUserLoggedIn.error in performLogin method: ",isUserLoggedIn.error)
      console.log("isUserLoggedIn.error.error in performLogin method: ",isUserLoggedIn.error.error)
      console.log("isUserLoggedIn.error.error.errorMessage in performLogin method: ",isUserLoggedIn.error.error.message)
      setErrorMessage(isUserLoggedIn.error.error.message)

    }
  }


  return(
        <View style={styles.form}>
          <HelperText type="error" visible={stateDictionary.showErrorMessage} style={{display: "flex", alignSelf: "center"}}>
            {stateDictionary.errorMessage}
          </HelperText>
          <GetInput label="Email" secureTextEntry={false} value={stateDictionary.email} setText={dispatch} textToChange="email" action="setEmail"/>
          <GetInput label="Password" secureTextEntry={true} value={stateDictionary.password} setText={dispatch} textToChange="password" action="setPassword"/>
          <View style={styles.buttonRow}>
            <Button style={styles.buttonStyle} mode='contained' onPress={performLogin}>Login</Button>
            <Button style={styles.buttonStyle} mode='contained' onPress={() => navigation.navigate('Register')}>Register</Button>
          </View>
          {/* <View style={styles.buttonRow}>
            <GetModal/>
          </View> */}
          {/* <Button onPress={showModal}>Show Modal!</Button>
          <Button onPress={hideModal}>Hide Modal!</Button> */}
        </View>
    ) 
};

export default Login;