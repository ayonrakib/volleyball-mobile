import React, { useReducer } from 'react';
import { Text, StyleSheet, View, TouchableOpacity, SafeAreaView, ScrollView } from 'react-native';
import { Button } from 'react-native-paper';
import BottomNavigation from '../Components/BottomNavigation';
import BottomNavigationIcon from '../Components/BottomNavigationIcon';
import AsyncStorageLib from "@react-native-async-storage/async-storage";
import { useEffect } from 'react';
import style from '../styles/styles';
import HomePage from './HomePage';
import NewsPage from './NewsPage';
import ProfilePage from './ProfilePage';
import PollPage from './PollPage';
import TournamentPage from './TournamentPage';
import { userService } from "../service/UserService";
var _ = require('lodash')

function reducer(stateDictionary: any, action: any) {
  // console.log("came into reducer method!");
  switch (action.name) {
    case "activateBottomNavigationPressableIcon":
      return { ...stateDictionary, activeBottomNavigationPressableIconNumber: action.data.iconNumber }
      break;
    case "setComponentIndex":
      console.log("the index to be set in setComponentIndex is: ", action.data)
      return { ...stateDictionary, componentIndex: action.data.componentIndex, componentToLoad: screenComponents[action.data.componentIndex] };
      break;
    case "reloadComponent":
      console.log("came into reloadComponent of dispatch!")
      return { ...stateDictionary, reloadComponent: true };
  }
}


const screenComponents = [<HomePage />, <NewsPage />, <ProfilePage />, <PollPage />, <TournamentPage />];

const HomeScreen = (props: any) => {
  useEffect(() => {
    console.log("came inside useeffect of HomeScreen method!")
    const isUserLoggedInAsyncMethod = async () => {
      const isUserLoggedIn = await userService.isLoggedIn();
      console.log("is user logged in response from userservice in useeffect: ", isUserLoggedIn.data);

      if (isUserLoggedIn !== undefined) {
        if (isUserLoggedIn.data.data) {
          console.log("user authenticated in useeffect of login!")
          props.navigation.navigate("HomeScreen")
        } else {
          userService.deleteSession();
          props.navigation.navigate("Login")
          // setErrorMessage()
        }
      }
    }
  }
  )

  // if userService.isLoggedIn() == true:
  //    direct user to homescreen
  // if userService.isLoggedIn() == false:
  //    redirect user to login screen
  const [stateDictionary, dispatch] = useReducer(reducer,
    {
      componentToLoad: <HomePage />,
      activeBottomNavigationPressableIconComponent: <BottomNavigationIcon
        iconName="home"
        iconColor="white"
        style={style.bottomNavigationIconStyleActive}
      />,
      activeBottomNavigationPressableIconNumber: 0,
      componentIndex: 0
    });


  function setComponentIndex(index) {
    console.log("came inside setComponentIndex method with value: ", index)
    dispatch({ name: "setComponentIndex", data: { componentIndex: index } });
  }


  function navigateToComponent(componentName) {
    props.navigation.navigate(`${componentName}`)
  }


  function activateBottomNavigationPressableIcon(props) {
    dispatch({ name: "activateBottomNavigationPressableIcon", data: { iconNumber: props } })
  }


  // function log out
  // input: nothing
  // return: nothing, just perform logout
  // method:
  //    1. call user service delete session method
  //    2. call dispatch and set reload component to true
  async function logout() {
    console.log("came into logout!");
    const logoutResponse = await userService.deleteSession();
    console.log("session deleted successfully in logout!")
    console.log("logoutResponse is: ", logoutResponse)
    if (logoutResponse) {
      dispatch({ name: "reloadComponent", data: { reloadComponent: true } });
    }
  }


  return (
    <View style={{ flex: 1 }}>

      <Button style={{ width: "30%", alignSelf: "flex-end", backgroundColor: "green", marginTop: 30 }} mode="contained" onPress={logout} >
        Logout!
      </Button>

      <ScrollView style={{ backgroundColor: "gray" }}>

        <View style={{ marginVertical: 10, width: "80%", alignSelf: "center", justifyContent: "center" }}>
          {stateDictionary.componentToLoad}
        </View>

      </ScrollView>
      <View style={{ justifyContent: "flex-end" }}>
        <BottomNavigation
          activateBottomNavigationPressableIcon={activateBottomNavigationPressableIcon}
          activeBottomNavigationPressableIconNumber={stateDictionary.activeBottomNavigationPressableIconNumber}
          setComponentIndex={setComponentIndex}
          componentIndex={stateDictionary.componentIndex}
        />
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