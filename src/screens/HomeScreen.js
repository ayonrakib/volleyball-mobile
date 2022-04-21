import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { Button, TextInput } from 'react-native-paper';
import GetInput from '../Components/GetInput';
import styles from '../styles/styles';

const HomeScreen = () => {
  return(
        <View style={styles.form}>
          <GetInput label="Email" secureTextEntry={false}/>
          <GetInput label="Password" secureTextEntry={true}/>
          <View style={styles.buttonRow}>
            <Button style={styles.buttonStyle} mode='contained'>Login</Button>
            <Button style={styles.buttonStyle} mode='contained'>Register</Button>
          </View>
        </View>
    ) 
};

export default HomeScreen;