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
  UIManager,
  AsyncStorage,
} from 'react-native'
import { getUserData, getDogs, getApiToken } from '../services/ApiMethods'
import Card from '../components/shared/Card'
import { dogs } from '../resources/dogs.json'


export default class DogList extends Component {
  state = {
    user: '',
    selectedBreeds: [],
    gender: [],
    zipcode: 0,
    locationRange: 0,
  }

  componentDidMount = () => {
    // this.setState({ user: this.props.navigation.getParam('user') });
    this.fetchUserData().then(() => {
      this.fetchDogs()
    })
  }

  componentWillUnmount = () => {
    clearInterval()
  }


  fetchUserData = async () => {
    const { navigation } = this.props
    const propsUserData = navigation.getParam('user')
    const token = await AsyncStorage.getItem("userToken")
    const resp = await getUserData(propsUserData.id, token)
    // , selectedBreeds: resp.breed.breed_list

    const { user, gender, zipcode, location_range, breed } = resp.data

    // console.log(breed.breed_list)

    this.setState({
      user: user,
      gender: gender,
      zipcode: String(zipcode),
      locationRange: String(location_range),
      selectedBreeds: breed.breed_list,
      dogListData: null
    });

    console.log(this.state.locationRange)
  }

  // Writing this function name made me laugh heehee
  fetchDogs = async () => {
    const { selectedBreeds, gender, zipcode, locationRange, token } = this.state

    // console.log('these are params', locationRange, zipcode)
    const resp = await getDogs(selectedBreeds, gender, zipcode, locationRange, dogs, token)

    this.setState({ 
      dogListData: resp.data.animals
     });

    console.log('this is dog resp', resp.data.animals)
    // console.log(this.state.selectedBreeds)
  }

  renderCards = () => {

    if(this.state.dogListData) {
      console.log(this.state.dogListData)
      return(
         <FlatList
    data={this.state.dogListData}
    renderItem={({ item }) => {   console.log(item)
     return(
      <Card 
      name={item.name}
      img1={item.photos[0].large}
      age={item.age}
      gender={item.gender}
      breeds={[item.breeds.primary, item.breeds.secondary, item.breeds.mixed]}
      distance={item.distance}
      contact={[item.contact.email,
        item.contact.phone]}
      size={item.size}
      />
     )
    }}
    keyExtractor={item => parseInt(item.id)}
    // extraData={this.state}
  />
      )
    }
  }

  render() {
    // { this.fetchUserData }
    return (
      <>
      {this.renderCards()}
      </>
    );
  }
}


const styles = StyleSheet.create({

  text: {
    textAlign: 'center'
  }
})
