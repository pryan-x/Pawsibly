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
import { dogs } from '../resources/dogs.json'


export default class ProfileSettings extends Component {
  state = {
    user: '',
    selectedItems: []
  }

  componentDidMount = () => {
    this.setState({ user: this.props.navigation.getParam('user') });
  }

  // dogListHighlight = (dogBreed) => {
  //   return (
  //     <TouchableHighlight onPress={} underlayColor='#616161'>
  //       <Text>{dogBreed}</Text>
  //     </TouchableHighlight>
  //   )
  // }

  render() {
    console.log(this.state.user)
    return (
      <View>
        <View style={{ flex: 1 }}>
          <Text style={[styles.text]}>Dog breeds you are interested in: </Text>
          
        </View>
        <View>
          <Text style={[styles.text]}>Show dogs in the radius of: </Text>
        </View>
        <View>
          <Text style={[styles.text]}>Show dogs from the ages: </Text>
        </View>
        <View>
          <Text></Text>
        </View>
      </View>
    );
  }
}


const styles = StyleSheet.create({
  text: {
    textAlign: 'center'
  }
})
