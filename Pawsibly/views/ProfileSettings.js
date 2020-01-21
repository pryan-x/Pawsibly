import React, { Component } from 'react'
import {
  View,
  Text,
  StyleSheet,
  FlatList,
  Image,
  RefreshControl,
  Platform,
  TouchableOpacity,
  AsyncStorage,
  LayoutAnimation,
  UIManager
} from 'react-native'
import LoginRegisterInput from '../components/shared/LoginRegisterInput'
import { updateUserSettings, deleteUser, deleteBreeds } from '../services/ApiMethods'

export default class ProfileSettings extends Component {
  state = {
    username: '',
    password: '',
    confirmPassword: '',
    zipCode: '',
    modalToggle: false,
  }

  componentDidMount = () => {
    this.initializeUserData()
  }

  initializeUserData = () => {
    let data = this.props.navigation.getParam('user')
    console.log(data)
    this.setState({
      username: data.username,
      zipCode: data.zipcode
    });
  }

  handleDeleteUser = async () => {
    const token = await AsyncStorage.getItem("userToken")
    const id = this.props.navigation.getParam('user').id

    await deleteUser(token, id)
    await deleteBreeds(id)
    this.logOut()

  }

  logOut = async () => {
    const userToken = await AsyncStorage.getItem("userToken")
    console.log('i am in home', userToken)

    const asyncStorageKeys = await AsyncStorage.getAllKeys();

    if (asyncStorageKeys.length > 0) {
        AsyncStorage.clear();
        this.props.navigation.navigate("Auth")
    } else {
        AsyncStorage.getAllKeys().then(AsyncStorage.multiRemove)
        this.props.navigation.navigate("Auth")
    }
}

  handleModalDelete = () => {
    return (
      <View>
        <Text>Are you sure you want to delete your account?</Text>
        <View>
          <TouchableOpacity onPress={this.handleDeleteUser} style={[styles.button]}><Text>Yes</Text></TouchableOpacity>
          <TouchableOpacity onPress={() => {this.setState({ modalToggle: false })}} style={[styles.button]}><Text>No</Text></TouchableOpacity>
        </View>
      </View>
    )
  }

  handleTextChange = (name, value) => {
    this.setState({ [name]: value.toLowerCase() })
  }

  storeInAsyncStorage = async (key, data) => {
    try {
      await AsyncStorage.setItem(key, data);
    } catch (error) {
      console.log(error)
    }
  }

  handleUpdateUserSettings = async () => {
    const { username, password, confirmPassword, zipCode } = this.state
    const id = this.props.navigation.getParam('user').id
    const token = await AsyncStorage.getItem("userToken")
    console.log(username, password, confirmPassword, zipCode, id, token)
    if (password === confirmPassword) {
      try {
        const resp = await updateUserSettings(
          username,
          password,
          parseInt(zipCode),
          token,
          id
        )
        console.log(resp)
        this.storeInAsyncStorage('userData', JSON.stringify(resp.data))

        console.log('stored your data!', await AsyncStorage.getItem('userData'))

        this.props.navigation.navigate('Home')
      } catch (error) {
        console.log(error)
      }
    }
  }

  renderUpdate = () => {
    return (
      <View>
        <Text>Change Profile Settings</Text>
        <Text>Change Username:</Text>
        <LoginRegisterInput
          name='username'
          textContentType='username'
          value={this.state.username}
          onChangeText={this.handleTextChange}>
        </LoginRegisterInput>
        <Text>Change Password:</Text>
        <LoginRegisterInput
          name='password'
          textContentType='password'
          value={this.state.password}
          // checkPassword={true}
          onChangeText={this.handleTextChange}>
        </LoginRegisterInput>
        <Text>Confirm Changed Password:</Text>
        <LoginRegisterInput
          name='confirmPassword'
          textContentType='password'
          value={this.state.confirmPassword}
          // checkPassword={true}
          onChangeText={this.handleTextChange}>
        </LoginRegisterInput>
        <Text>Change Zipcode:</Text>
        <LoginRegisterInput
          name='zipCode'
          textContentType='postalCode'
          keyboardType='number-pad'
          value={this.state.zipCode}
          onChangeText={this.handleTextChange}>
        </LoginRegisterInput>
        <TouchableOpacity onPress={this.handleUpdateUserSettings} style={[styles.button]}>
          <Text>Update Profile Settings</Text>
        </TouchableOpacity>
        <TouchableOpacity onPress={() => {this.setState({ modalToggle: true })}} style={[styles.button]}>
          <Text>Delete Account</Text>
        </TouchableOpacity>          
        {this.state.modalToggle === true ? this.handleModalDelete() : false}
      </View>
    )
  }

  render() {
    return (
      <View
      // style={styles.container}
      >
        <View
        // style={styles.login_container}
        >
          {this.renderUpdate()}

        </View>
      </View>
    )
  }
}
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'grey'
  },
  button: {
    alignSelf: 'stretch',
    alignItems: 'center',
    justifyContent: 'center',
    borderWidth: 2,
    borderRadius: 15,
    paddingVertical: 10,
    marginHorizontal: 50
  },
  text: {
    textAlign: 'center'
  }
})

