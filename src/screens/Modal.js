import * as React from 'react';
import { Modal, Portal, Text, Button, Provider } from 'react-native-paper';
import { View } from 'react-native';

const GetModal = (props) => {
  const containerStyle = {backgroundColor: 'white', padding: 10};

  return (
      <Portal>
        <Modal visible={props.visible} onDismiss={props.hideModal} contentContainerStyle={containerStyle}>
          <Text>{props.errorMessage}</Text>
        </Modal>
      </Portal>
  );
};

export default GetModal;