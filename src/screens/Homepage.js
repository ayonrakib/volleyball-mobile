import React, {useReducer} from 'react';
import { View, Text } from "react-native";
import { Button } from "react-native-paper";
import AsyncStorageLib from "@react-native-async-storage/async-storage";
import styles from "../styles/styles";
// import Login from "./Login";
import axios from 'axios';
import { useEffect } from "react";
var _ = require('lodash');

function reducer(stateDictionary, action){
  console.log("came in reducer method of Homepage component!");
  switch(action.name){
    case action.name == "reloadComponent":
      console.log("came into reloadComponent of dispatch!")
      return { ...stateDictionary, reloadComponent: true};
    }
  }

export default function Homepage({navigation}){
  const getData = async () => {
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
      return sampleStoredDataInCookie
    } catch(e) {
      // error reading value
      console.error(e)
    }
  }
  useEffect(()=>{
    console.log("came inside useeffect of login method!")
    getData().then(response => {
      console.log("response from get data method is: ", response)
      // console.log("is response empty: ", _.isEqual(response, []))
      if(!(_.isEqual(response, []))){
        axios({
          method: "post",
          url: "http://192.168.1.88:8080/validate-cookie-mariadb",
          data: {
            data: response
          }
        }).then(response => {
          console.log("response from validate cookie mariadb url is: ",response.data)
          if(!(response.data.data)){
            navigation.navigate('Login')
          }
        }).catch(error => console.error(error))
      }
    })
  })
  const [stateDictionary, dispatch] = useReducer(reducer, { reloadComponent: false });
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
          dispatch({name: "reloadComponent", data: { reloadComponent : true }})
        } catch (e) {
          console.error(e)
        }
      }
    return(
        <View>
            <Text>
                Home page!
            </Text>

            <Button mode="contained" onPress={deleteCookie}>
                Logout!
            </Button>
        </View>
    )
}