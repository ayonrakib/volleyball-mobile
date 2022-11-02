import { TextInput } from "react-native-paper";
import * as React from 'react';
import styles from "../styles/styles";

export default function GetInput(props){
    if(props.textToChange === "firstName"){
        return (
            <TextInput
                mode="outlined"
                outlineColor="gray"
                autoCapitalize="none"
                style={styles.inputStyle}
                label={props.label}
                value={props.value}
                secureTextEntry={props.secureTextEntry}
                onChangeText={(text) => props.setText({ name: props.action , data : { firstName : text } })  } 
            />
        )
    }
    else if(props.textToChange === "lastName"){
        return (
            <TextInput
                mode="outlined"
                outlineColor="gray"
                autoCapitalize="none"
                style={styles.inputStyle}
                label={props.label}
                value={props.value}
                secureTextEntry={props.secureTextEntry}
                onChangeText={(text) => props.setText({ name: props.action , data : { lastName : text } })  } 
            />
        )
    }
    else if(props.textToChange === "email"){
        return (
            <TextInput
                mode="outlined"
                outlineColor="gray"
                autoCapitalize="none"
                style={styles.inputStyle}
                label={props.label}
                value={props.value}
                secureTextEntry={props.secureTextEntry}
                onChangeText={(text) => props.setText({ name: props.action , data : { email : text } })  } 
            />
        )
    }
    return (
        <TextInput
            mode="outlined"
            outlineColor="gray"
            autoCapitalize="none"
            style={styles.inputStyle}
            label={props.label}
            value={props.value}
            secureTextEntry={props.secureTextEntry}
            onChangeText={(text) => props.setText({ name: props.action , data : { password : text } })  } 
        />
    )

}