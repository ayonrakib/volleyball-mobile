import React from "react";
import { View } from "react-native";
import Icon from 'react-native-vector-icons/FontAwesome';
import getStyles from "../styles/styles";

export default function BottomNavigationIcon(props:any){
    const iconName = <Icon size={15} name={props.iconName} color={props.iconColor} />
    return (
        <View style={props.style}>
            {iconName}
        </View>
    )
}