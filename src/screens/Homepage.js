import { View, Text } from "react-native";
import { Button } from "react-native-paper";
import AsyncStorageLib from "@react-native-async-storage/async-storage";
import styles from "../styles/styles";

export default function Homepage(){
    return(
        <View>
            Home page!
            <Button icon="camera" mode="contained" onPress={() => console.log('Pressed')}>
                Delete session
            </Button>
        </View>
    )
}