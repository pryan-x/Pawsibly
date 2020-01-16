import { createAppContainer, createSwitchNavigator } from "react-navigation";
import React, { Component } from "react";
import {
  StatusBar,
  StyleSheet,
  Text,
  View,
  TextInput,
  TouchableOpacity,
  AsyncStorage
} from "react-native";
import { Spinner } from './components/shared/Spinner'
import { Primary } from './colors/index'
import { createStackNavigator } from "react-navigation-stack";
import { RotationGestureHandler } from "react-native-gesture-handler";
import Login from "./views/login/Login";
import HomeStack from "./navigators/HomeStack"

class AuthLoadingScreen extends React.Component {
  constructor() {
    super();
    this._bootstrapAsync();
  }
  // Fetch the token from storage then navigate to our appropriate place
  _bootstrapAsync = async () => {
      try {
      const userToken = await AsyncStorage.getItem("userToken")
      console.log('i am in app', userToken)
      // This will switch to the App screen or Auth screen and this loading
      // screen will be unmounted and thrown away.
      this.props.navigation.navigate(userToken ? "HomeStack" : "Auth")
    //   this.props.navigation.navigate(userToken ? "Auth" : "HomeStack")
      } catch (error) {
          console.log(error)
      }
    };
  // Render any loading content that you like here
  render() {
    return (
      <View style={styles.container}>
        <Spinner />
        <StatusBar barStyle="default" />
      </View>
    );
  }
}

const AuthStack = createStackNavigator(
  {
    Login: Login
  },
  {
    initialRouteName: "Login"
  }
);

const AppContainer = createAppContainer(
  createSwitchNavigator(
    {
      AuthLoading: AuthLoadingScreen,
      Auth: AuthStack,
      HomeStack: HomeStack
    },
    {
      initialRouteName: "AuthLoading"
    }
  )
);

export default class App extends Component {
  render() {
    return <AppContainer />
  }
}

const styles = StyleSheet.create({
  container: {
    justifyContent: "center",
    alignItems: "center",
    color: "black",
    flex: 1,
  },
  main: {
    marginTop: 200,
    height: 1000
  },
  button: {
    width: 150,
    height: 42,
    borderWidth: 0.5,
    borderColor: "black",
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "black",
    borderRadius: 7
  },
  input: {
    borderWidth: 0.5,
    borderRadius: 7,
    borderColor: "black",
    width: "85%",
    height: 42
  },
  btnText: {
    color: "white"
  }
});