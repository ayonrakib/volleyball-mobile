import { View, Text } from "react-native";
import styles from "../styles/styles";
import { Button } from "react-native-paper";
import GetInput from "../Components/GetInput";

export default function Register(props){
    return (
        <View style={styles.form}>
            <GetInput style={styles.inputStyle} label="First Name" secureTextEntry={false}/>
            <GetInput style={styles.inputStyle} label="Last Name" secureTextEntry={false}/>
            <GetInput style={styles.inputStyle} label="Email" secureTextEntry={false}/>
            <GetInput style={styles.inputStyle} label="Password" secureTextEntry={true}/>
            <View style={styles.buttonRow}>
                <Button style={styles.buttonStyle} mode="contained">Submit</Button>
                <Button style={styles.buttonStyle} mode="contained" onPress={() => props.navigation.navigate('Login')}>Cancel</Button>
            </View>

        </View>
    )
}