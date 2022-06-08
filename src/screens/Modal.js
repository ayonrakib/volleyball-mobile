import * as React from 'react';
import { Modal, Portal, Text, Button, Provider } from 'react-native-paper';
import { View } from 'react-native';

const GetModal = () => {
  const [visible, setVisible] = React.useState(false);

  const showModal = () => setVisible(true);
  const hideModal = () => setVisible(false);
  const containerStyle = {backgroundColor: 'white', padding: 40};

  return (
    <View>
      <Portal>
        <Modal visible={visible} onDismiss={hideModal} contentContainerStyle={containerStyle}>
          <Text>Example Modal.  Click outside this area to dismiss.</Text>
        </Modal>
      </Portal>
      <Button onPress={showModal}>
        Show
      </Button>
    </View>
  );
};

export default GetModal;