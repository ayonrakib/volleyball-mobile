import React, { useReducer } from "react";
import { View, Text, Pressable } from "react-native";
import Icon from 'react-native-vector-icons/FontAwesome';
import BottomNavigationIcon from "./BottomNavigationIcon";
import BottomNavigationIconText from "./BottomNavigationIconText";
import style from "../styles/styles";


export default function BottomNavigation(props: any) {
    console.log("active icon number in bottom navigation component: ", props.componentIndex)
    const bottomNavigationIcons = [
        <BottomNavigationIcon
            iconName="camera"
            iconColor="white"
            style={style.bottomNavigationIconStyle}
        />,
        <BottomNavigationIcon
            iconName="table"
            iconColor="white"
            style={style.bottomNavigationIconStyle}
        />,
        <BottomNavigationIcon
            iconName="list-ol"
            iconColor="white"
            style={style.bottomNavigationIconStyle}
        />,
        <BottomNavigationIcon
            iconName="group"
            iconColor="white"
            style={style.bottomNavigationIconStyle}
        />,
        <BottomNavigationIcon
            iconName="area-chart"
            iconColor="white"
            style={style.bottomNavigationIconStyle}
        />
    ];


    const activeBottomNavigationIcons = [
        <BottomNavigationIcon
            iconName="camera"
            iconColor="white"
            style={style.bottomNavigationIconStyleActive}
        />,
        <BottomNavigationIcon
            iconName="table"
            iconColor="white"
            style={style.bottomNavigationIconStyleActive}
        />,
        <BottomNavigationIcon
            iconName="list-ol"
            iconColor="white"
            style={style.bottomNavigationIconStyleActive}
        />,
        <BottomNavigationIcon
            iconName="group"
            iconColor="white"
            style={style.bottomNavigationIconStyleActive}
        />,
        <BottomNavigationIcon
            iconName="area-chart"
            iconColor="white"
            style={style.bottomNavigationIconStyleActive}
        />
    ];
    bottomNavigationIcons[props.componentIndex] = activeBottomNavigationIcons[props.componentIndex]

    const buttonNames = ["Gallery", "Fixture", "Rules", "Teams", "Score"];


    // get pressable icon
    // input: component index
    // return: pressable icon component
    // method:
    //      1. return pressable icon component with onpress parameter and icon and text
    function getPressableIcon(componentIndex) {
        return (
            <Pressable
                style={style.bottomNamvigationPressableBlock}
                onPress={() => props.setComponentIndex(componentIndex)}
            >
                {bottomNavigationIcons[componentIndex]}
                <BottomNavigationIconText
                    iconText={buttonNames[componentIndex]}
                />
            </Pressable>
        )
    }


    return (
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
            {getPressableIcon(4)}

        </View>
    )
}