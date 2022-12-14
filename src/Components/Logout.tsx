import * as React from 'react';
import { View } from 'react-native';
import { Button } from 'react-native-paper';
import { userService } from '../service/UserService';

export default function Logout(props: any) {
    // function log out
    // input: nothing
    // return: nothing, just perform logout
    // method:
    //    1. call user service delete session method
    //    2. call dispatch and set reload component to true
    async function handleLogout() {
        // console.log("came into logout!");
        // console.log("props in logout component is: ", props);
        const logoutResponse = await userService.deleteSession();
        // console.log("session deleted successfully in logout!");
        // console.log("logoutResponse is: ", logoutResponse);
        if (logoutResponse) {
            props.navigation.navigate("Login");
        }
    }
    return (
        <View style={{ flex: 1, alignSelf: "center", justifyContent: "center" }}>
            <Button style={{ backgroundColor: "gray" }} mode="contained" onPress={handleLogout} >
                Logout!
            </Button>
        </View>

    )
}