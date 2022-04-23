import { TextInput } from "react-native-paper";
import styles from "../styles/styles";

export default function GetInput(props){
    return (
        <TextInput
            mode="outlined"
            outlineColor="gray"
            autoCapitalize="none"
            style={styles.inputStyle}
            label={props.label}
            value={props.value}
            secureTextEntry={props.secureTextEntry}
            onChangeText={(text) => props.setText({ name: "setEmail" , data :{ email: text } })  } 
        />
    )
}