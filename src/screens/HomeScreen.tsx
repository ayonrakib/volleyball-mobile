import React, {useReducer} from 'react';
import { Text, StyleSheet, View, TouchableOpacity } from 'react-native';
import { Button } from 'react-native-paper';
import BottomNavigation from '../Components/BottomNavigation';
import BottomNavigationIcon from '../Components/BottomNavigationIcon';
import AsyncStorageLib from "@react-native-async-storage/async-storage";
import axios from 'axios';
import { useEffect } from 'react';
import style from '../styles/styles';
import HomePage from './HomePage';
import NewsPage from './NewsPage';
import ProfilePage from './ProfilePage';
import PollPage from './PollPage';
var _ = require('lodash')

function reducer(stateDictionary:any, action:any){
  // console.log("came into reducer method!");
  switch(action.name){
      case "loadFirstComponent":
          return { ...stateDictionary, componentToLoad : <HomePage/>};
          break;
      case "loadSecondComponent":
          return { ...stateDictionary, componentToLoad : <NewsPage/>};
          break;
      case "loadThirdComponent":
          return { ...stateDictionary, componentToLoad : <ProfilePage/>};
          break;
      case "loadFourthComponent":
          return { ...stateDictionary, componentToLoad : <PollPage/>};
          break;
      case "activateBottomNavigationPressableIcon":
        return { ...stateDictionary, activeBottomNavigationPressableIconNumber: action.data.iconNumber }
        break;
      case "setComponentIndex":
        console.log("the index to be set in setComponentIndex is: ",action.data)
        return { ...stateDictionary, componentIndex : action.data.componentIndex, componentToLoad : screenComponents[action.data.componentIndex]};
        break;
      case action.name == "reloadComponent":
        console.log("came into reloadComponent of dispatch!")
        return { ...stateDictionary, reloadComponent: true};
  }
}


const screenComponents = [<HomePage/>, <NewsPage/>, <ProfilePage/>, <PollPage/>];

const HomeScreen = (props:any) => {
  const [stateDictionary, dispatch] = useReducer(reducer, 
    { 
      componentToLoad : <HomePage/>, 
      activeBottomNavigationPressableIconComponent: <BottomNavigationIcon 
                                                        iconName = "home" 
                                                        iconColor = "white" 
                                                        style={style.bottomNavigationIconStyleActive} 
                                                    />, 
      activeBottomNavigationPressableIconNumber : 0, 
      componentIndex: 0
    }); 
  
  console.log("icon number active: ",stateDictionary.activeBottomNavigationPressableIconNumber)
  console.log("index number active: ",stateDictionary.componentIndex)
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
            props.navigation.navigate('Login')
          }
        }).catch(error => console.error(error))
      }
    })
  }, [])
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


  function setComponentIndex(index){
    console.log("came inside setComponentIndex method with value: ",index)
    dispatch({ name : "setComponentIndex" , data : { componentIndex : index } });
  }


  function navigateToComponent(componentName){
    props.navigation.navigate(`${componentName}`)
  }


  function activateBottomNavigationPressableIcon(props){
    dispatch({ name: "activateBottomNavigationPressableIcon", data : { iconNumber: props } })
  }


  return (
    <View style={{flex: 1}}>
        <Button style={{width: "30%", alignSelf: "flex-end", backgroundColor: "green"}} mode="contained" onPress={deleteCookie} >
          Logout!
        </Button>
      <View style={{backgroundColor: "white", flexDirection: "row", flex:10, justifyContent: "center", alignItems: "center"}}>
        <View>
          {stateDictionary.componentToLoad}
        </View>
      </View>
      <View style={{flex: 1, justifyContent: "flex-end"}}>
        <View>

          <BottomNavigation 
                activateBottomNavigationPressableIcon={activateBottomNavigationPressableIcon}  
                activeBottomNavigationPressableIconNumber={stateDictionary.activeBottomNavigationPressableIconNumber}
                setComponentIndex = {setComponentIndex}
                componentIndex = {stateDictionary.componentIndex}   
          />
        </View>   
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  text: {
    fontSize: 30,
  },
});

export default HomeScreen;