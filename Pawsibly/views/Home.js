import React, { Component } from 'react'
import {
    View,
    Text,
    StyleSheet,
    FlatList,
    Image,
    RefreshControl,
    Platform,
    LayoutAnimation,
    UIManager
} from 'react-native'

export default class Home extends Component {
    state = {}

    handleNavigate = (name) => {
        this.props.navigation.navigate('Details', { 
            
         }
    }

    renderButtons = (text, name) => {
        <TouchableOpacity name={name} onPress={() => this.handleNavigate(name)} 
        // style={[styles.button]}
        >
        <Text>{text}</Text>
    </TouchableOpacity>
    }
    render() {
        return (
            <View>
                {this.renderButtons('Narrow your search!', 'Filters')}
                {this.renderButtons('Profile Settings', 'ProfileSettings')}
                {this.renderButtons('Search!', 'DogSearch')}
                {this.renderButtons('Your Pawsibilities', 'UserList')}
            </View>
        );
    }
}

