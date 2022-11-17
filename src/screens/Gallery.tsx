import React from "react";
import { Image, View, TouchableOpacity } from "react-native";
import { useState } from "react";
import { ScrollView } from "react-native-gesture-handler";
import styles from "../styles/styles";
import GetModal from '../screens/Modal';

export default function Gallery() {
    const [visible, setVisible] = useState(false);
    console.log("Gallery: Came to gallery component!");

    const showModal = () => setVisible(true);
    const hideModal = () => setVisible(false);

    function showImageInModal(imageLocation) {
        console.log("Gallery: came inside showImageInModal method!");
        showModal();
    }

    let imageRow = [];
    for (let index = 0; index < 2; index++) {
        imageRow.push(
            <TouchableOpacity style={{ "width": 180, "height": 180 }} key={Math.random()} onPress={() => showImageInModal("../../assets/images/tournament-2022-pictures/1.jpg")}>
                <Image
                    resizeMode="contain"
                    source={require("../../assets/images/tournament-2022-pictures/1.jpg")}
                    style={styles.galleryImage}
                />
            </TouchableOpacity>
        )
    }
    return (
        <ScrollView>
            <GetModal visible={visible} hideModal={hideModal} errorMessage={"Sample error message for modal"} imageLocation="../../assets/images/tournament-2022-pictures/1.jpg" />
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