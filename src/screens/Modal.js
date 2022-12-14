import * as React from 'react';
import { Modal, Portal, Text, Button, Provider } from 'react-native-paper';
import { Image, View } from 'react-native';

// props e height width pathaye dibo. jodi height choto hoy, error message show korbo

const GetModal = (props) => {
  const containerStyle = {backgroundColor: 'white', padding: 10};

  return (
      <Portal>
        <Modal visible={props.visible} onDismiss={props.hideModal} contentContainerStyle={containerStyle}>
          <Text>{props.errorMessage}</Text>
          <View style={{flex:1, justifyContent:"center", alignItems:"center"}}>
            <Image style={{"width":400, "height":400}} resizeMode='contain' source={require("../../assets/images/tournament-2022-pictures/1.jpg")}/>
          </View>
          
        </Modal>
      </Portal>
  );
};

export default GetModal;