import 'react-native-gesture-handler';
import { createDrawerNavigator } from '@react-navigation/drawer';
import * as React from 'react';
import Login from './Login';
import PollPage from './PollPage';
import Register from './Register';
import Tournament from './Tournament';

export default function LoggedOutDrawer() {
    const Drawer = createDrawerNavigator();
    return (
        <>
            <Drawer.Screen name="Login" component={Login} />
            <Drawer.Screen name="Register" component={Register} />
            <Drawer.Screen name="Poll" component={PollPage} />
            <Drawer.Screen name="Tournament" component={Tournament} />
        </>
    )
}