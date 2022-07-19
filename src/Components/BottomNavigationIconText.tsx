import React from "react";
import { Text } from "react-native";
import style from "../styles/styles";

export default function BottomNavigationIconText(props){
    return(
        <Text style={style.bottomNavigationTextStyle}>
            {props.iconText}
        </Text>
    )
}