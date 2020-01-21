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

export default class Home extends Component {
    state = {
  
    }

    componentDidMount = () => {
        this.fetchUserData()
    }


    fetchUserData = async () => {
        const user = await AsyncStorage.getItem('userData')
        this.setState({ user: JSON.parse(user) });
        console.log('i am in home this data is from state', this.state.user.id)

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
        return (
            <ImageBackground
            source={require('../resources/dogBackground.jpg')} style={[styles.background, {width: '100%', height: '100%'}]}
            >
                <View style={[styles.container]}>
                    <TouchableOpacity 
                        onPress={() => {
                            navigate('FilterSearch', 
                            { user: user });
                        }} 
                        style={[styles.button]}
                    >
                        <Text style={styles.text}>{'Narrow your search!'}</Text>
                    </TouchableOpacity>
                    <TouchableOpacity 
                        onPress={() => {
                            navigate('ProfileSettings', 
                            { user: user });
                        }}
                        style={[styles.button]}
                    >
                        <Text style={styles.text}>{'Profile Settings'}</Text>
                    </TouchableOpacity>
                    <TouchableOpacity 
                        onPress={() => {
                            navigate('DogList',
                            { user: user })}}
                        style={[styles.button]}
                    >
                        <Text style={styles.text}>{'Search!'}</Text>
                    </TouchableOpacity>
                    <TouchableOpacity 
                        // onPress={() => {
                        //     navigate('UserList', 
                        //     { user: user });
                        // }}
                        style={[styles.button]}
                    >
                        <Text style={styles.text}>{'Your Pawsibilities'}</Text>
                    </TouchableOpacity>
                    {/* {this.renderButtons('Narrow your search!', 'Filters')}
                    {this.renderButtons('Profile Settings', 'ProfileSettings')}
                    {this.renderButtons('Search!', 'DogSearch')}
                    {this.renderButtons('Your Pawsibilities', 'UserList')}
                    {this.renderButtons('Log Out', 'LogOut')} */}
                <TouchableOpacity onPress={this.logOut} style={[styles.button, styles.log_out]}>
                    <Text style={styles.text}>Log Out</Text>
                </TouchableOpacity>
                </View>
            </ImageBackground>
        );
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
        backgroundColor: 'rgba(244,240,255,0.85)',
        justifyContent: "space-around",
        alignItems: `center`,
    },
    button: {
        alignItems: 'center',
        justifyContent: 'center',
        borderRadius: 10,
        padding: 8,
        borderColor: '#69BAC6',
        backgroundColor: '#69BAC6',
        paddingVertical: 10,
        marginVertical: 20,
        width: '80%'
    },
    log_out: {
        marginTop: 80,
        marginBottom: 100
    },
    text: {
        fontFamily: 'quicksandBold',
        textAlign: 'center',
        color: 'white',
        fontSize: 28
    }
})