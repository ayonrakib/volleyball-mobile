import { View, Text } from "react-native";
import { Button } from "react-native-paper";
import AsyncStorageLib from "@react-native-async-storage/async-storage";
import styles from "../styles/styles";

export default function Homepage(){
    const getCookie = async () => {
        console.log("came into get cookie method!")
        try {
          const values = await AsyncStorageLib.getAllKeys()
          if(values !== null) {
            // value previously stored
            console.log("async storage keys are: ",values)
          }
          else{
            console.log("null storage: ",values)
          }
          const sampleStoredDataInCookie = await AsyncStorageLib.getItem("@name");
          console.log("sample Stored Data In Cookie:", sampleStoredDataInCookie);
          return values
        } catch(e) {
          // error reading value
          console.error(e)
        }
      }

      const storeCookie = async () => {
        console.log("came into store cookie method!")
        try {
          await AsyncStorageLib.setItem('@name', "rakib")
          getCookie()
        } catch (e) {
          console.error(e)
        }
      }

      const deleteCookie = async () => {
        console.log("came into delete cookie method!")
        try {
          await AsyncStorageLib.removeItem("@name");
          getCookie()
        } catch (e) {
          console.error(e)
        }
      }
    return(
        <View>
            <Text>
                Home page!
            </Text>
           
            <Button mode="contained" onPress={getCookie}>
                Get session!
            </Button>

            <Button mode="contained" onPress={storeCookie}>
                Store session!
            </Button>

            <Button mode="contained" onPress={deleteCookie}>
                Delete session!
            </Button>
        </View>
    )
}