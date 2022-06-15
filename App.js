// import { createAppContainer } from "react-navigation";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { NavigationContainer } from '@react-navigation/native'
import { AppRegistry } from 'react-native';
import { Provider as PaperProvider } from "react-native-paper";
import { Provider as StoreProvider } from "react-redux";
import Login from "./src/screens/Login";
import Register from "./src/screens/Register";
import Homepage from "./src/screens/Homepage";
import GetModal from "./src/screens/Modal";

const Stack = createNativeStackNavigator();

export default function App(){
  return (
      <PaperProvider>
        <NavigationContainer>
          <Stack.Navigator>
            {/* <Stack.Screen options={{headerShown: false}} name="Modal" component={GetModal} /> */}
            <Stack.Screen options={{headerShown: false}} name="Login" component={Login} />
            <Stack.Screen options={{headerTitle: ""}}  name="Register" component={Register} />
            <Stack.Screen options={{headerTitle: ""}}  name="Homepage" component={Homepage} />
          </Stack.Navigator>
        </NavigationContainer>
      </PaperProvider>
  )
}

AppRegistry.registerComponent("Hello World", () => App)