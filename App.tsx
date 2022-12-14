import 'react-native-gesture-handler';
import { createDrawerNavigator } from '@react-navigation/drawer';
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { NavigationContainer } from '@react-navigation/native';
import { Provider as PaperProvider } from 'react-native-paper';
import * as React from 'react';
import Login from './src/screens/Login';
import Register from './src/screens/Register';
import HomePage from './src/screens/HomePage';
import PollPage from './src/screens/PollPage';
import ProfilePage from './src/screens/ProfilePage';
import Tournament from './src/screens/Tournament';
import { userService } from './src/service/UserService';
import LoggedInDrawer from './src/screens/LoggedInDrawer';
import LoggedOutDrawer from './src/screens/LoggedOutDrawer';
import { useEffect, useReducer } from 'react';

const Drawer = createDrawerNavigator();
const Stack = createNativeStackNavigator();

function reducer(stateDictionary, action) {
  console.log("came inside reducer of App!");
  switch (action.name) {
    case "isLoggedIn":
      console.log("user is logged in in reducer of App!");
      return { ...stateDictionary, isLoggedIn: action.data.loginResponse };
    default:
      return stateDictionary;
  }
}

export default function App() {
  const [stateDictionary, dispatch] = useReducer(reducer, { isLoggedIn: false });
  useEffect(() => {
    const checkIfUserIsLoggedIn = async () => {
      const loginResponse = await userService.isLoggedIn();
      console.log("loginResponse in useeffect of app component is: ", loginResponse);
      dispatch({ name: "isLoggedIn", data: { loginResponse: loginResponse.data } });
    }

  }, [])
  // let loginResponse = false;

  const loggedInDrawerComponent = <LoggedInDrawer />;
  const loggedOutDrawerComponent = <LoggedOutDrawer />;

  const loginComponent = <Login navigation={loggedInDrawerComponent} />;

  // if (stateDictionary.isLoggedIn) {
  //   return (
  //     <Drawer.Navigator>
  //       <Drawer.Screen name="Home" component={HomePage} />
  //       <Drawer.Screen name="Profile" component={ProfilePage} />
  //       <Stack.Screen name="Tournament" component={Tournament} />
  //     </Drawer.Navigator>
  //   )
  // } else {
  return (
    <PaperProvider>
      <NavigationContainer>
        <Stack.Navigator>
          <Stack.Screen
            options={{ headerShown: false }}
            name="Login"
            component={LoggedOutDrawer}
          />
          <Stack.Screen
            options={{ headerShown: false }}
            name="LoggedInDrawer"
            component={LoggedInDrawer}
            initialParams={{ isLoggedIn: true }}
          />

          <Stack.Screen name="Register" component={Register} />
        </Stack.Navigator>
      </NavigationContainer>
    </PaperProvider>
  )
  // }
  // return (
  //   <PaperProvider>
  //     <NavigationContainer>
  //       <Drawer.Navigator initialRouteName="Home">
  //         <Drawer.Screen name="HomePage" component={HomePage} />
  //         <Drawer.Screen name="Profile" component={ProfilePage} />
  //         <Drawer.Screen name="Poll" component={PollPage} />
  //         <Drawer.Screen name="Tournament" component={Tournament} />
  //       </Drawer.Navigator>
  //     </NavigationContainer>
  //   </PaperProvider>
  // )


}