import React, { Component } from 'react'
import {
    View,
    Text,
    StyleSheet,
    FlatList,
    Image,
    RefreshControl,
    Platform,
    TouchableOpacity
} from 'react-native'
import { White, Primary, Background, Accent } from '../../colors'
import LoginRegisterInput from '../../components/shared/LoginRegisterInput'
import { LoginMethod, RegisterMethod } from '../../services/ApiMethods'

export default class Login extends Component {
    state = {
        username: '',
        password: '',
        confirmPassword: '',
        loginToggled: false,
        error: false
    }

    handleTextChange = (name, value) => {
        this.setState({ [name]: value.toLowerCase() })
    }

    handleSubmit = () => {
        this.state.loginToggled === false ? this.handleLogin() : this.handleRegister()
    }

    handleLogin = async () => {
        if (this.state.username.length >= 3 && this.state.password.length >= 3) {
            const resp = await LoginMethod(this.state.username, this.state.password)
            console.log(resp.data)
            if(resp.status === 201) {
                this.props.navigation.navigate('ProfileSettings')
            }
        }
    }

    handleRegister = async () => {
        if (this.state.username.length >= 3 && this.state.password.length >= 3) {
            if (this.state.password === this.state.confirmPassword) {
                const resp = await RegisterMethod(this.state.username, this.state.password, this.state.confirmPassword)
                console.log(resp.data)
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
                        value={this.state.username}
                        onChangeText={this.handleTextChange}>
                    </LoginRegisterInput>
                    <Text>Password:</Text>
                    <LoginRegisterInput
                        name='password'
                        value={this.state.password}
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
                        value={this.state.username}
                        onChangeText={this.handleTextChange}>
                    </LoginRegisterInput>
                    <Text>Password:</Text>
                    <LoginRegisterInput
                        name='password'
                        value={this.state.password}
                        checkPassword={true}
                        onChangeText={this.handleTextChange}>
                    </LoginRegisterInput>
                    <Text>Confirm Password:</Text>
                    <LoginRegisterInput
                        name='confirmPassword'
                        value={this.state.confirmPassword}
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

