import { createDrawerNavigator } from '@react-navigation/drawer';
import { NavigationContainer } from '@react-navigation/native';
import * as React from 'react';
import 'react-native-gesture-handler';
import HomePage from './src/screens/HomePage';
import PollPage from './src/screens/PollPage';
import ProfilePage from './src/screens/ProfilePage';
import Tournament from './src/screens/Tournament';

const Drawer = createDrawerNavigator();

export default function App() {
  return (
    <NavigationContainer>
      <Drawer.Navigator initialRouteName="Home">
        <Drawer.Screen name="HomePage" component={HomePage} />
        <Drawer.Screen name="Profile" component={ProfilePage} />
        <Drawer.Screen name="Poll" component={PollPage} />
        <Drawer.Screen name="Tournament" component={Tournament} />
      </Drawer.Navigator>
    </NavigationContainer>
  )
}