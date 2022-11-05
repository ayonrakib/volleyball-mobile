import * as React from 'react';
import { Button } from 'react-native-paper';
import { userService } from '../service/UserService';

export default function Logout(props) {
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
            props.dispatch({ name: "reloadComponent", data: { reloadComponent: true } });
        }
    }
    return (
        <Button style={{ width: "30%", alignSelf: "flex-end", backgroundColor: "green" }} mode="contained" onPress={logout} >
            Logout!
        </Button>
    )


}