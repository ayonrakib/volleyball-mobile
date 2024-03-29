import React, {useReducer, useEffect} from 'react';
import { View } from 'react-native';
import { Button, TextInput, HelperText } from 'react-native-paper';
import GetInput from '../Components/GetInput';
import styles from '../styles/styles';
import GetModal from '../screens/Modal';
import {userService}  from '../service/UserService';
import HomePage from './HomePage';
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
      return { ...stateDictionary, reloadComponent: action.data.reloadComponent};
    case "clearCredentials":
      console.log("came inside clear credentials of dispatch in Login!");
      return { ...stateDictionary, email : "", password : "" }
    case "showErrorMessageOnModal":
      return { ...stateDictionary, errorMessage : action.data.errorMessage };
    case "isLoggedIn":
      console.log("Login: came into isLoggedIn of dispatch!");
      return { ...stateDictionary, isLoggedIn: action.data.loginResponse };
    default:
      return stateDictionary;

  }
}


// console.log("userService object is: ",userService)
const Login = ({navigation}) => {
  const [visible, setVisible] = React.useState(false);
  const [stateDictionary, dispatch] = useReducer(reducer, {email: "", password: "", isLoggedIn: false, visible: false, errorMessage: "initial error message", showErrorMessage: false, reloadComponent: false});
  console.log("Login: Login component loaded!");
  useEffect(()=>{
    console.log("Login: came inside useeffect of login method!")
    const isUserLoggedIn = async() => {
      const loginResponse = await userService.isLoggedIn();
      console.log("Login: is user logged in response from userservice in useeffect: ",loginResponse.data);
  
      if (loginResponse !== undefined) {
        
        if (loginResponse.data) {
       
          console.log("Login: user authenticated in useeffect of login!")
          dispatch({ name: "isLoggedIn", data: { loginResponse: loginResponse.data } });
    
        } else {
    
          userService.deleteSession();
          dispatch( {name: "clearCredentials",data:""})
    
        }
      }
    }
    isUserLoggedIn();
  }, [stateDictionary.reloadComponent]);
  
  if(stateDictionary.isLoggedIn){
    navigation.navigate("LoggedInDrawer");
  }
  
  const showModal = () => setVisible(true);
  const hideModal = () => setVisible(false);

  

  function setErrorMessage(errorMessage){
    dispatch({name: "setErrorMessage", data: { errorMessage : errorMessage }});
  }


  function hideErrorMessage(){
    dispatch({name: "hideErrorMessage", data: { showErrorMessage : false }});
  }


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

    console.log("Login: user service login method response in login component is: ", isUserLoggedIn)

    if (isUserLoggedIn.data) {
      console.log("Login: isUserLoggedIn.data in performLogin method: ",isUserLoggedIn.data)
      hideErrorMessage();
      dispatch( {name : "reloadComponent" , data : { reloadComponent : true }} )

    } else {
      console.log("isUserLoggedIn.data in performLogin method: ",isUserLoggedIn.data)
      console.log("isUserLoggedIn.error in performLogin method: ",isUserLoggedIn.error)
      console.log("isUserLoggedIn.error.error in performLogin method: ",isUserLoggedIn.error.error)
      console.log("isUserLoggedIn.error.error.errorMessage in performLogin method: ",isUserLoggedIn.error.error.message)
      setErrorMessage(isUserLoggedIn.error.error.message)
      // dispatch({ name : "showErrorMessageOnModal" , data: { errorMessage: isUserLoggedIn.error.error.message } })
      showModal();

    }
  }


  return(
        <View style={styles.form}>
          <GetModal visible={visible} hideModal={hideModal} errorMessage={stateDictionary.errorMessage}/>
          <GetInput label="Email" secureTextEntry={false} value={stateDictionary.email} setText={dispatch} textToChange="email" action="setEmail"/>
          <GetInput label="Password" secureTextEntry={true} value={stateDictionary.password} setText={dispatch} textToChange="password" action="setPassword"/>
          <View style={styles.buttonRow}>
            <Button style={styles.buttonStyle} mode='contained' onPress={performLogin}>Login</Button>
            <Button style={styles.buttonStyle} mode='contained' onPress={() => navigation.navigate('Register')}>Register</Button>
          </View>
        </View>
    ) 
};

export default Login;