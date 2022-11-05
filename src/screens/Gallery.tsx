import React from "react";
import { Image, View } from "react-native";
import styles from "../styles/styles";

export default function Gallery() {
    return (
        <View style={{ "flex": 1, "justifyContent": "space-around", "flexDirection": "row" }}>
            <View style={{ "width": 150, "height": 150, "borderRadius": 30 }}>
                <Image resizeMode="contain" source={require("../../assets/images/tournament-2022-pictures/1.jpg")} style={styles.galleryImageSize} />
            </View>
            <View style={{ "width": 150, "height": 150, "borderRadius": 30 }}>
                <Image resizeMode="contain" source={require("../../assets/images/tournament-2022-pictures/1.jpg")} style={styles.galleryImageSize} />
            </View>
        </View>
    )
}