import 'react-native-gesture-handler';
import { createDrawerNavigator } from '@react-navigation/drawer';
import * as React from 'react';
import HomePage from './HomePage';
import PollPage from './PollPage';
import ProfilePage from './ProfilePage';
import Tournament from './Tournament';
import Logout from '../Components/Logout';
import { useEffect, useReducer } from 'react';
import { userService } from '../service/UserService';

function reducer(stateDictionary, action) {
    switch (action.name) {
        case "reloadComponent":
            console.log("came into reloadComponent of dispatch of LoggedInDrawer!");
            return { ...stateDictionary, reloadComponent: action.data.reloadComponent };
        case "isLoggedIn":
            console.log("came into isLoggedIn of dispatch of LoggedInDrawer!");
            return { ...stateDictionary, isLoggedIn: action.data.loginResponse };
        default:
            return stateDictionary;
    }
}

export default function LoggedInDrawer(props) {
    const [stateDictionary, dispatch] = useReducer(reducer, { reloadComponent: false, isLoggedIn: props.route.params.isLoggedIn });
    console.log("LoggedInDrawer: Came inside LoggedInDrawer Component!");
    console.log("LoggedInDrawer: props.route.params.isLoggedIn: ", props.route.params.isLoggedIn);
    useEffect(() => {
        const checkIfUserIsLoggedIn = async () => {
            const loginResponse = await userService.isLoggedIn();
            console.log("loginResponse in useeffect of app component is: ", loginResponse);
            dispatch({ name: "isLoggedIn", data: { loginResponse: loginResponse.data } });
        }
    }, [])
    if (!stateDictionary.isLoggedIn) {
        props.navigation.navigate("Login");
    }
    const Drawer = createDrawerNavigator();
    return (
        <Drawer.Navigator initialRouteName="HomePage">
            <Drawer.Screen name="HomePage" component={HomePage} />
            <Drawer.Screen name="Profile" component={ProfilePage} />
            <Drawer.Screen name="Poll" component={PollPage} />
            <Drawer.Screen name="Tournament" component={Tournament} />
            <Drawer.Screen name="Logout" component={Logout} />
        </Drawer.Navigator>
    )
}