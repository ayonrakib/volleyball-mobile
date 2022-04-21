import { StyleSheet } from "react-native";

const styles = StyleSheet.create({
    text: {
        marginTop: 120,
        paddingTop: 50
    },
    form:{
        flex: 1,
        justifyContent: "center",
        alignContent: "center"
    },
    inputStyle:{
        marginHorizontal: 50,
        marginBottom: 15
    },
    buttonStyle:{
        width: 122
    },
    buttonRow:{
        display: "flex", 
        flexDirection: "row", 
        justifyContent: "space-evenly",
        marginTop: 30
    }
  });

export default styles;