import React, {useReducer} from "react";
import { View, Text, Pressable } from "react-native";
import Icon from 'react-native-vector-icons/FontAwesome';
import BottomNavigationIcon from "./BottomNavigationIcon";
import BottomNavigationIconText from "./BottomNavigationIconText";
import style from "../styles/styles";


export default function BottomNavigation(props:any){
    console.log("active icon number in bottom navigation component: ",props.componentIndex)
    const bottomNavigationIcons = [
                                    <BottomNavigationIcon 
                                        iconName = "home" 
                                        iconColor = "white" 
                                        style={style.bottomNavigationIconStyle}
                                    />, 
                                    <BottomNavigationIcon 
                                        iconName = "newspaper-o" 
                                        iconColor = "white" 
                                        style={style.bottomNavigationIconStyle}
                                    />, 
                                    <BottomNavigationIcon 
                                        iconName = "image" 
                                        iconColor = "white" 
                                        style={style.bottomNavigationIconStyle}
                                    />, 
                                    <BottomNavigationIcon 
                                        iconName = "bar-chart" 
                                        iconColor = "white" 
                                        style={style.bottomNavigationIconStyle}
                                        />
                                ];
    
    
    const activeBottomNavigationIcons = [
                                            <BottomNavigationIcon 
                                                iconName = "home" 
                                                iconColor = "white" 
                                                style={style.bottomNavigationIconStyleActive}
                                            />, 
                                            <BottomNavigationIcon 
                                                iconName = "newspaper-o" 
                                                iconColor = "white" 
                                                style={style.bottomNavigationIconStyleActive}
                                            />, 
                                            <BottomNavigationIcon 
                                                iconName = "image" 
                                                iconColor = "white" 
                                                style={style.bottomNavigationIconStyleActive}
                                            />, 
                                            <BottomNavigationIcon 
                                                iconName = "bar-chart" 
                                                iconColor = "white" 
                                                style={style.bottomNavigationIconStyleActive}
                                            />
                                        ];
    bottomNavigationIcons[props.componentIndex] = activeBottomNavigationIcons[props.componentIndex]

    const buttonNames = ["Home" , "News", "Profile", "Poll"];


    // get pressable icon
    // input: component index
    // return: pressable icon component
    // method:
    //      1. return pressable icon component with onpress parameter and icon and text
    function getPressableIcon(componentIndex){
        return(
            <Pressable 
                style={style.bottomNamvigationPressableBlock} 
                onPress={() => props.setComponentIndex(componentIndex)}
            >
                {bottomNavigationIcons[componentIndex]}
                <BottomNavigationIconText 
                    iconText = {buttonNames[componentIndex]}
                />
            </Pressable>
        )
    }

    
    return(
        <View style={{ 
                        height: 60, 
                        flexDirection: "row", 
                        justifyContent: "space-evenly", 
                        alignItems: "center", 
                        backgroundColor: "#0a6c5b"
                    }}>
                {getPressableIcon(0)}
                {getPressableIcon(1)}
                {getPressableIcon(2)}
                {getPressableIcon(3)}

        </View>
    )
}