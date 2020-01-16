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
import { White, Primary, Background, Accent } from '../../colors'
import LoginRegisterInput from '../../components/shared/LoginRegisterInput'
import { LoginMethod, RegisterMethod, initializeUserBreed } from '../../services/ApiMethods'

export default class Login extends Component {
    state = {
        username: '',
        password: '',
        confirmPassword: '',
        zipCode: 11111,
        loginToggled: false,
        error: false,
        user: {},
        items: false
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

            this.storeInAsyncStorage('userData', JSON.stringify(resp.data.user))
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
                const resp = await RegisterMethod(
                   username, 
                   password, 
                   zipCode
                )
                await initializeUserBreed(resp.data.id)
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
                    <Text>Login</Text>
                    <Text>Username:</Text>
                    <LoginRegisterInput
                        name='username'
                        textContentType='username'
                        value={this.state.username}
                        onChangeText={this.handleTextChange}>
                    </LoginRegisterInput>
                    <Text>Password:</Text>
                    <LoginRegisterInput
                        name='password'
                        value={this.state.password}
                        typeOfInput='password'
                        checkPassword={true}
                        onChangeText={this.handleTextChange}>
                    </LoginRegisterInput>
                    <TouchableOpacity onPress={this.handleSubmit} style={[styles.button]}>
                        <Text>{this.state.loginToggled === false ? 'Login' : 'Register'}</Text>
                    </TouchableOpacity>
                </View>
            )
        }
    }

    renderRegister = () => {
        if (this.state.loginToggled === true) {
            return (
                <View>
                    <Text>Register</Text>

                    <Text>Username:</Text>
                    <LoginRegisterInput
                        name='username'
                        textContentType='username'
                        value={this.state.username}
                        onChangeText={this.handleTextChange}>
                    </LoginRegisterInput>
                    <Text>Password:</Text>
                    <LoginRegisterInput
                        name='password'
                        typeOfInput='password'
                        value={this.state.password}
                        checkPassword={true}
                        onChangeText={this.handleTextChange}>
                    </LoginRegisterInput>
                    <Text>Confirm Password:</Text>
                    <LoginRegisterInput
                        name='confirmPassword'
                        typeOfInput='password'
                        value={this.state.confirmPassword}
                        checkPassword={true}
                        onChangeText={this.handleTextChange}>
                    </LoginRegisterInput>
                    <Text>Zipcode:</Text>
                    <LoginRegisterInput
                        name='zipCode'
                        typeOfInput='postalCode'
                        value={this.state.zipCode}
                        onChangeText={this.handleTextChange}>
                    </LoginRegisterInput>
                    <TouchableOpacity onPress={this.handleSubmit} style={[styles.button]}>
                        <Text>{this.state.loginToggled === false ? 'Login' : 'Register'}</Text>
                    </TouchableOpacity>
                </View>
            )
        }
    }

    render() {
        return (
            <View
            // style={styles.container}
            >
                <View
                // style={styles.login_container}
                >
                    {this.renderLogin()}
                    {this.renderRegister()}
                    <Text>
                        dont have an account? {this.state.loginToggled === false ? 'Register' : 'Login'} here
                    </Text>
                    <TouchableOpacity onPress={this.handleToggle} style={[styles.button]}>
                        <Text>{this.state.loginToggled === false ? 'Register' : 'Login'}</Text>
                    </TouchableOpacity>
                </View>
            </View>
        )
    }
}
const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: Primary
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

