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
import { NavigationEvents } from 'react-navigation'

export default class Home extends Component {
    state = {
  
    }

    componentDidMount = () => {
        this.fetchUserData()
    }

    // componentWillUnmount() {
    //     // remove event listener
    // }

    // focusListener = () => {
    //     this.props.navigation.addListener("didFocus",() => {
    //     this.fetchUserData
    //   })};

    fetchUserData = async () => {
        const user = await AsyncStorage.getItem('userData')
        this.setState({ user: JSON.parse(user) });

        console.log('i am in home this data is from state', this.state.user)

    }

    // handleNavigate = (name) => {
    //     if(this.state.user) {
    //     this.props.navigation.navigate(
    //         `${name}`, {
    //         user: 'hi'
    //     })
    // }
    // }

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

    // renderButtons = (text, name) => {
    //     // if (name === 'LogOut') {
    //     //     <TouchableOpacity onPress={this.logOut} style={[styles.button]}>
    //     //         <Text>LogOut</Text>
    //     //     </TouchableOpacity>
    //     // }

    //     <TouchableOpacity onPress={() => {
    //         this.props.navigation.navigate(`${name}`, {
    //             user: this.props.userData
    //         });
    //     }} style={[styles.button]}>
    //         <Text>{text}</Text>
    //     </TouchableOpacity>

    // }

    render() {
        const { user } = this.state
        const { navigate } = this.props.navigation
        // {this.focusListener}
        return (
            <View style={[styles.container]}>
                <View style={[styles.container]}>
                    <TouchableOpacity 
                        onPress={() => {
                            navigate('FilterSearch', 
                            { user: user });
                        }} 
                        style={[styles.button]}
                    >
                        <Text>{'Narrow your search!'}</Text>
                    </TouchableOpacity>
                    <TouchableOpacity 
                        onPress={() => {
                            navigate('ProfileSettings', 
                            { user: user });
                        }}
                        style={[styles.button]}
                    >
                        <Text>{'Profile Settings'}</Text>
                    </TouchableOpacity>
                    <TouchableOpacity 
                        onPress={() => {
                            navigate('DogSearch', 
                            { user: user });
                        }} 
                        style={[styles.button]}
                    >
                        <Text>{'Search!'}</Text>
                    </TouchableOpacity>
                    <TouchableOpacity 
                        onPress={() => {
                            navigate('UserList', 
                            { user: user });
                        }}
                        style={[styles.button]}
                    >
                        <Text>{'Your Pawsibilities'}</Text>
                    </TouchableOpacity>
                    {/* {this.renderButtons('Narrow your search!', 'Filters')}
                    {this.renderButtons('Profile Settings', 'ProfileSettings')}
                    {this.renderButtons('Search!', 'DogSearch')}
                    {this.renderButtons('Your Pawsibilities', 'UserList')}
                    {this.renderButtons('Log Out', 'LogOut')} */}
                </View>
                <TouchableOpacity onPress={this.logOut} style={[styles.button, styles.log_out]}>
                    <Text>LogOut</Text>
                </TouchableOpacity>
            </View>
        );
    }
}

const styles = StyleSheet.create({
    container: {
        justifyContent: "space-around",
        alignItems: "center",
        color: "black",
        flex: 1,
        paddingVertical: 100,
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
    log_out: {
        marginBottom: 100
    },
    text: {
        textAlign: 'center'
    }
})