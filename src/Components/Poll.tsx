import React from "react";
import { View, Text } from "react-native";
import { Button } from "react-native-paper";
import styles from "../styles/styles";

export default function Poll(){
    return(
        <View style={styles.pollBackGround}>
            <Text>
                Poll
            </Text>
        </View>
    )
}