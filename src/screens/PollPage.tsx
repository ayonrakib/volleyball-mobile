import React from "react";
import { View, Text } from "react-native";
import { useReducer } from "react";
import Poll from "../Components/Poll";

const PollPage = (props:any) => {
    console.log("came inside PollPage component!");
    return(
        <Poll/>
    )
}

export default PollPage;