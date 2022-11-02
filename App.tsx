// import { createAppContainer } from "react-navigation";
import { NavigationContainer } from '@react-navigation/native';
import * as React from 'react';
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { AppRegistry } from 'react-native';
import 'react-native-gesture-handler';
import { Provider as PaperProvider } from "react-native-paper";
import Login from "./src/screens/Login";
import Register from "./src/screens/Register";
// import Homepage from "./src/screens/Homepage";
// import { BottomNavigation } from "react-native-paper";
import HomeScreen from "./src/screens/HomeScreen";


const Stack = createNativeStackNavigator();

export default function App() {
  return (
    // <HomeScreen />
    <PaperProvider>
      <NavigationContainer>
        <Stack.Navigator screenOptions={{ headerShown: false }}>
          {/* <Stack.Screen options={{headerShown: false}} name="Modal" component={GetModal} /> */}

          <Stack.Screen options={{ headerShown: false }} name="Login" component={Login} />
          <Stack.Screen options={{ headerTitle: "" }} name="Register" component={Register} />
          {/* <Stack.Screen options={{headerTitle: "", headerBackVisible: false}}  name="Homepage" component={Homepage} /> */}

          <Stack.Screen options={{ headerTitle: "", headerBackVisible: false }} name="HomeScreen" component={HomeScreen} />


        </Stack.Navigator>
      </NavigationContainer>
    </PaperProvider>
  )
}

AppRegistry.registerComponent("Hello World", () => App)