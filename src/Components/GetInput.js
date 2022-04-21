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
            secureTextEntry={props.secureTextEntry}
        />
    )
}