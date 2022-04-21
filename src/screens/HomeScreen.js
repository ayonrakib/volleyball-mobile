import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { Button, TextInput } from 'react-native-paper';
import styles from '../styles/styles';

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
          <View style={styles.buttonRow}>
            <Button style={styles.buttonStyle} mode='contained'>Login</Button>
            <Button style={styles.buttonStyle} mode='contained'>Register</Button>
          </View>
        </View>
    ) 
};

export default HomeScreen;