import 'react-native-gesture-handler';
import * as React from 'react';
import { createDrawerNavigator } from '@react-navigation/drawer';
import { NavigationContainer } from '@react-navigation/native';
import HomePage from './src/screens/Gallery';
import Tournament from './src/screens/Tournament';
import ProfilePage from './src/screens/ProfilePage';
import PollPage from './src/screens/PollPage';

const Drawer = createDrawerNavigator();

export default function App() {
  return (
    <NavigationContainer>
      <Drawer.Navigator initialRouteName="Home">
        <Drawer.Screen name="Home" component={HomePage} />
        <Drawer.Screen name="Profile" component={ProfilePage} />
        <Drawer.Screen name="Poll" component={PollPage} />
        <Drawer.Screen name="Tournament" component={Tournament} />
      </Drawer.Navigator>
    </NavigationContainer>
  )
}