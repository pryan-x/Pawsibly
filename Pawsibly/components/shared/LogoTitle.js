import React, { Component } from "react";
import {
  StatusBar,
  StyleSheet,
  Text,
  View,
  TextInput,
  TouchableOpacity,
  AsyncStorage,
  Image
} from "react-native";


export default class LogoTitle extends React.Component {
    render() {
      return (
        <View style={styles.container}>
          <Text style={[styles.title]}>
              Pawsibly
          </Text>
         <Image
         source={require('../../resources/dog.png')}
         style={{ width: 35, height: 35, bottom: 5, marginLeft: 7 }}
         />
        </View>
      );
    }
  }

  const styles = {
      container: {
        flexDirection: 'row'
      },
      title: {
          fontFamily: 'quicksandBold',
          fontSize: 35,
          color: '#9078D1',
          lineHeight: 32,
          letterSpacing: -1
      }
  }