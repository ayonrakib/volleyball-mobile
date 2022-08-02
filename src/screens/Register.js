import React, {useReducer, useEffect} from "react";
import { View, Text } from "react-native";
import styles from "../styles/styles";
import { Button, Paragraph, Dialog, Portal, Provider, Modal } from "react-native-paper";
import GetInput from "../Components/GetInput";
import AsyncStorageLib from "@react-native-async-storage/async-storage";
import axios from "axios";
import { userService } from "../service/UserService";
var _ = require('lodash');
function reducer(stateDictionary, action){
    console.log("came into reducer of Register component!")
    switch(action.name){
        case "setFirstName":
            return { ...stateDictionary, firstName: action.data.firstName }
        case "setLastName":
            return { ...stateDictionary, lastName: action.data.lastName }
        case "setEmail":
            return { ...stateDictionary, email: action.data.email }
        case "setPassword":
            return { ...stateDictionary, password: action.data.password }
        case "reloadComponent":
            console.log("came inside reloadComponent dispatch!")
            return { ...stateDictionary, reloadComponent: true }
        default:
            return stateDictionary;
    }
}

export default function Register(props){
    const [stateDictionary, dispatch] = useReducer(reducer, {firstName: "", lastName: "", email: "", password: "", reloadComponent: false});
    const [visible, setVisible] = React.useState(false);

    const showModal = () => setVisible(true);
    const hideModal = () => setVisible(false);
      useEffect(async ()=>{
        console.log("came inside useeffect of register method!")
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
      },[])
    const containerStyle = {backgroundColor: 'white', padding: 20};
    const [errorExplanation, setErrorExplanation] = React.useState("");

    function getStateValues(){
        console.log("value of states is: ",stateDictionary)
    }


    async function register(){
        console.log("came in register method!")
        const registrationResponse = await userService.registerInMariadb(stateDictionary);
        console.log("registrationResponse in register method in register component: ",registrationResponse)
        
        // axios({
        //     method: "POST",
        //     url: "http://192.168.1.88:8080/register-mariadb",
        //     data: stateDictionary
        // }).then(response => {
        //     console.log("response from register in mariadb is: ",response.data)
        //     if(!(response.data.data)){
        //         console.log("response.data.data is false!")
        //         showModal()
        //         setErrorExplanation(response.data.error.errorMessage);
        //     }
        //     else{
        //         console.log("response from register in mariadb is: ",response.data)
        //         storeData(response.data.data);
        //         dispatch({name: "reloadComponent", data: { reloadComponent : true }})
        //     }
        // }).catch(error => console.error(error))
    }

    return (
        <View style={styles.form}>
            <Portal>
                <Modal visible={visible} onDismiss={hideModal} contentContainerStyle={containerStyle}>
                <Text>{errorExplanation}</Text>
                </Modal>
            </Portal>
            
            <Button style={{marginTop: 30}} onPress={showModal}>
                        Show
                    </Button>
            <GetInput style={styles.inputStyle} label="First Name" secureTextEntry={false} value={stateDictionary.firstName} setText = {dispatch} textToChange="firstName" action="setFirstName"/>
            <GetInput style={styles.inputStyle} label="Last Name" secureTextEntry={false} value={stateDictionary.lastName} setText = {dispatch} textToChange="lastName" action="setLastName"/>
            <GetInput style={styles.inputStyle} label="Email" secureTextEntry={false} value={stateDictionary.email} setText = {dispatch} textToChange="email" action="setEmail"/>
            <GetInput style={styles.inputStyle} label="Password" secureTextEntry={true} value={stateDictionary.password} setText = {dispatch} textToChange="password" action="setPassword"/>
            <View style={styles.buttonRow}>
                <Button style={styles.buttonStyle} mode="contained" onPress={register}>Submit</Button>
                <Button style={styles.buttonStyle} mode="contained" onPress={() => props.navigation.navigate('Login')}>Cancel</Button>
            </View>
        </View>
    )
}