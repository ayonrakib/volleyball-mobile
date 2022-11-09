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
        width: 122,
        borderRadius: 10
    },
    buttonRow:{
        display: "flex", 
        flexDirection: "row", 
        justifyContent: "space-evenly",
        marginTop: 30
    },
    bottomNavigationIconStyle:{
        marginBottom: 2,
        alignItems: "center",
        justifyContent: "center",
        padding: 5,
        height: 25,
        borderRadius: 5
    },
    bottomNavigationIconStyleActive:{
        marginBottom: 2,
        alignItems: "center",
        justifyContent: "center",
        backgroundColor: "black",
        padding: 5,
        height: 25,
        borderRadius: 5
    },
    bottomNavigationTextStyle:{
        color: "white",
        marginTop: 2
    },
    bottomNavigationTextStyleActive:{
        color: "black",
        marginTop: 2
    },
    bottomNamvigationPressableBlock:{
        width: 50,
        alignItems: "center"
    },
    pollBackGround:{
        backgroundColor: "yellow",
        height: 50,
        width: 100,
        borderRadius: 20,
        color: "white",
        justifyContent: "center", 
        alignItems: "center", 
        margin: 10
    },
    galleryImageContainerBlock:{
        width: 150, 
        height: 150, 
        borderRadius: 30
    },
    galleryImage:{
        maxHeight: "100%", 
        maxWidth: "100%",
        borderRadius: 30
    }
  });

export default styles;