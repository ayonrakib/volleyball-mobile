import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { Button, TextInput } from 'react-native-paper';

const HomeScreen = () => {
  return(
        <View style={styles.form}>
          <TextInput
            mode='outlined'
            style = {styles.inputStyle}
            label="Email"
            autoCapitalize='none'
            outlineColor='gray'
          />
          <TextInput
            mode='outlined'
            style={styles.inputStyle}
            label="Password"
            autoCapitalize='none'
            secureTextEntry={true}
          />
          <View style={{display: "flex", flexDirection: "row", justifyContent: "space-evenly", marginTop: 30}}>
            <Button style={styles.buttonStyle} mode='contained'>Login</Button>
            <Button style={styles.buttonStyle} mode='contained'>Register</Button>
          </View>
        </View>
    ) 
};

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
  }
});

export default HomeScreen;