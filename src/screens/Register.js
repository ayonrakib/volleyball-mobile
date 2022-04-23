import React, {useReducer} from "react";
import { View, Text } from "react-native";
import styles from "../styles/styles";
import { Button } from "react-native-paper";
import GetInput from "../Components/GetInput";

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
        default:
            return stateDictionary;
    }
}

export default function Register(props){
    const [stateDictionary, dispatch] = useReducer(reducer, {firstName: "", lastName: "", email: "", password: ""});

    function getStateValues(){
        console.log("value of states is: ",stateDictionary)
    }
    return (
        <View style={styles.form}>
            <GetInput style={styles.inputStyle} label="First Name" secureTextEntry={false} value={stateDictionary.firstName} setText = {dispatch} textToChange="firstName" action="setFirstName"/>
            <GetInput style={styles.inputStyle} label="Last Name" secureTextEntry={false} value={stateDictionary.lastName} setText = {dispatch} textToChange="lastName" action="setLastName"/>
            <GetInput style={styles.inputStyle} label="Email" secureTextEntry={false} value={stateDictionary.email} setText = {dispatch} textToChange="email" action="setEmail"/>
            <GetInput style={styles.inputStyle} label="Password" secureTextEntry={true} value={stateDictionary.password} setText = {dispatch} textToChange="password" action="setPassword"/>
            <View style={styles.buttonRow}>
                <Button style={styles.buttonStyle} mode="contained" onPress={getStateValues}>Submit</Button>
                <Button style={styles.buttonStyle} mode="contained" onPress={() => props.navigation.navigate('Login')}>Cancel</Button>
            </View>

        </View>
    )
}