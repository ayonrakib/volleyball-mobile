import React from "react";
import { Image, View } from "react-native";
import { ScrollView } from "react-native-gesture-handler";
import styles from "../styles/styles";

export default function Gallery() {
    console.log("Came to gallery component!")
    let imageRow = [];
    for (let index = 0; index < 2; index++) {
        imageRow.push(
            <View style={{ "width": 150, "height": 150, "borderRadius": 30 }} key={Math.random()}>
                <Image
                    resizeMode="contain"
                    source={require("../../assets/images/tournament-2022-pictures/1.jpg")}
                    style={styles.galleryImage}
                />
            </View>
        )
    }
    return (
        <ScrollView style={{ "flex": 1 }}>
            <View style={{ "justifyContent": "space-around", "flexDirection": "row" }}>
                {imageRow}
            </View>
            <View style={{ "justifyContent": "space-around", "flexDirection": "row" }}>
                {imageRow}
            </View>
            <View style={{ "justifyContent": "space-around", "flexDirection": "row" }}>
                {imageRow}
            </View>
            <View style={{ "justifyContent": "space-around", "flexDirection": "row" }}>
                {imageRow}
            </View>
            <View style={{ "justifyContent": "space-around", "flexDirection": "row" }}>
                {imageRow}
            </View>
        </ScrollView>

    )
}