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
    UIManager,
    ImageBackground
} from 'react-native'
import { White, Primary, Background, Accent } from '../../colors'
import LoginRegisterInput from '../../components/shared/LoginRegisterInput'
import { LoginMethod, RegisterMethod, initializeUserBreed } from '../../services/ApiMethods'

export default class Login extends Component {
    state = {
        username: '',
        password: '',
        confirmPassword: '',
        zipCode: '',
        loginToggled: false,
    }

    handleTextChange = (name, value) => {
        this.setState({ [name]: value.toLowerCase() })
    }

    handleSubmit = () => {
        this.state.loginToggled === false ? this.handleLogin() : this.handleRegister()
    }

    storeInAsyncStorage = async (key, data) => {
        try {
            await AsyncStorage.setItem(key, data);
        } catch (error) {
            console.log(error)
        }
    }

    handleLogin = async () => {
        try {
            const resp = await LoginMethod(this.state.username, this.state.password)

            this.storeInAsyncStorage('userData', resp.data.user)
            this.storeInAsyncStorage('userToken', resp.data.token)

            console.log('stored your token!', await AsyncStorage.getItem('userToken'))
            console.log('stored your data!', await AsyncStorage.getItem('userData'))

            this.props.navigation.navigate('Home')
        } catch (error) {
            console.log(error)
        }
    }

    handleRegister = async () => {
        const { username, password, confirmPassword, zipCode } = this.state

        if (this.state.username.length >= 3 && this.state.password.length >= 3) {
            if (this.state.password === this.state.confirmPassword) {
                try {
                await RegisterMethod(
                   username, 
                   password, 
                   parseInt(zipCode)
                )

                const resp = await LoginMethod(username, password)

                await initializeUserBreed(JSON.parse(resp.data.user).id)

                this.storeInAsyncStorage('userData', resp.data.user)
                this.storeInAsyncStorage('userToken', resp.data.token)

                console.log('stored your token!', await AsyncStorage.getItem('userToken'))
                console.log('stored your data!', await AsyncStorage.getItem('userData'))

                this.props.navigation.navigate('Home')
                } catch (error) {
                    console.log(error)
                }
            }
        }
    }

    handleToggle = () => {
        this.state.loginToggled === false ? this.setState({ loginToggled: true, error: false, username: '', password: '' }) : this.setState({ loginToggled: false, error: false, username: '', password: '' })
    }



    renderLogin = () => {
        if (this.state.loginToggled === false) {
            return (
                <View>
                    <Text style={[styles.text, {textAlign: 'center', margin: 25}]}>Login</Text>
                    <Text style={styles.text}>Username:</Text>
                    <LoginRegisterInput
                        name='username'
                        textContentType='username'
                        value={this.state.username}
                        onChangeText={this.handleTextChange}>
                    </LoginRegisterInput>
                    <Text style={styles.text}>Password:</Text>
                    <LoginRegisterInput
                        name='password'
                        value={this.state.password}
                        textContentType='password'
                        checkPassword={true}
                        onChangeText={this.handleTextChange}>
                    </LoginRegisterInput>
                    <TouchableOpacity onPress={this.handleSubmit} style={[styles.button]}>
                        <Text style={styles.toggleButtonText}>{this.state.loginToggled === false ? 'Login' : 'Register'}</Text>
                    </TouchableOpacity>
                </View>
            )
        }
    }

    renderRegister = () => {
        if (this.state.loginToggled === true) {
            return (
                <View>
                    <Text style={[styles.text, {textAlign: 'center', margin: 25}]}>Register</Text>

                    <Text style={styles.text}>Username:</Text>
                    <LoginRegisterInput
                        name='username'
                        textContentType='username'
                        value={this.state.username}
                        onChangeText={this.handleTextChange}>
                    </LoginRegisterInput>
                    <Text style={styles.text}>Password:</Text>
                    <LoginRegisterInput
                        name='password'
                        textContentType='password'
                        value={this.state.password}
                        checkPassword={true}
                        onChangeText={this.handleTextChange}>
                    </LoginRegisterInput>
                    <Text style={styles.text}>Confirm Password:</Text>
                    <LoginRegisterInput
                        name='password'
                        textContentType='password'
                        value={this.state.confirmPassword}
                        checkPassword={true}
                        onChangeText={this.handleTextChange}>
                    </LoginRegisterInput>
                    <Text style={styles.text}>Zipcode:</Text>
                    <LoginRegisterInput
                        name='zipcode'
                        textContentType='postalCode'
                        keyboardType='number-pad'
                        value={this.state.zipCode}
                        onChangeText={this.handleTextChange}>
                    </LoginRegisterInput>
                    <TouchableOpacity onPress={this.handleSubmit} style={[styles.button]}>
                        <Text style={styles.toggleButtonText}>{this.state.loginToggled === false ? 'Login' : 'Register'}</Text>
                    </TouchableOpacity>
                </View>
            )
        }
    }

    render() {
        return (
            <ImageBackground
            source={require('../../resources/dogBackground.jpg')} style={[styles.background, {width: '100%', height: '100%'}]}
            >
                <View
                style={styles.container}
                >
                    {this.renderLogin()}
                    {this.renderRegister()}
                    <Text style={[styles.text, {textAlign: 'center', marginVertical: 8}]}>
                        {`dont have an account? \n${this.state.loginToggled === false ? 'register' : 'login'} here`}
                    </Text>
                    <TouchableOpacity onPress={this.handleToggle} style={[styles.toggleButton]}>
                        <Text style={styles.toggleButtonText}>{this.state.loginToggled === false ? 'Register' : 'Login'}</Text>
                    </TouchableOpacity>
                </View>
            </ImageBackground>
        )
    }
}
const styles = StyleSheet.create({
    background: {
        alignItems: 'center',
        justifyContent: 'center',
        // backgroundImage: 
    },
    container: {
        width: '85%',
        borderRadius: 15,
        paddingHorizontal: 15,
        paddingTop: 20,
        backgroundColor: 'rgba(244,240,255,1)',
        justifyContent: "space-around",
        alignItems: `center`,
    },
    button: {
        alignItems: 'center',
        justifyContent: 'center',
        borderRadius: 10,
        padding: 6,
        marginLeft: '50%',
        marginRight: '15%',
        borderColor: '#69BAC6',
        backgroundColor: '#69BAC6'
    },
    toggleButton: {
        alignItems: 'center',
        justifyContent: 'center',
        borderWidth: 2,
        borderRadius: 10,
        padding: 6,
        marginHorizontal: '30%',
        marginTop: 8,
        marginBottom: 30,
        borderColor: '#69BAC6',
        backgroundColor: '#69BAC6',
    },
    toggleButtonText: {
        color: 'white',
        fontFamily: 'quicksandBold',
        fontSize: 20,
    },
    text: {
        fontFamily: 'quicksandBold',
          fontSize: 30,
          color: '#9078D1'
    }
})

