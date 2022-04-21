import { createAppContainer } from "react-navigation";
import { createStackNavigator } from "react-navigation-stack";
import { AppRegistry } from 'react-native';
import { Provider as PaperProvider } from "react-native-paper";
import { Provider as StoreProvider } from "react-redux";
import HomeScreen from "./src/screens/HomeScreen";


// const navigator = createStackNavigator(
//   {
//     Home: HomeScreen,
//   },
//   {
//     initialRouteName: "Home",
//     defaultNavigationOptions: {
//       title: "App",
//       headerShown: false
//     },
//   }
// );

// export default createAppContainer(navigator);
export default function App(){
  return (
      <PaperProvider>
        <HomeScreen/>
      </PaperProvider>
  
  )
}

AppRegistry.registerComponent("Hello World", () => App)