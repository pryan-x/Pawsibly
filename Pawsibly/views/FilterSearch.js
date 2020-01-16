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
    Button,
    TouchableOpacity,
    AsyncStorage,
} from 'react-native'
import MultiSelect from '../components/MultiSelect'
import Slider from "@brlja/react-native-slider";
import { updateUser, updateUserBreeds } from '../services/ApiMethods'

const maxBreeds = 8

export default class FilterSearch extends Component {
    constructor() {
        super();
        this.state = {
            selectedBreeds: [],
            user: {},
            confirmText: `0/${maxBreeds}`,
            value: 10,
            colorMale: 'black',
            colorFemale: 'black',
            male: false,
            female: false
        };
    }

    componentDidMount = () => {
        this.setState({ user: this.props.navigation.getParam('user') });
        // this.checkForPreexistingFilters
    }

    onPressColorChange = (gender) => {
        if(gender === 'male') {
            this.state.colorMale === 'black' ? this.setState({ colorMale: 'blue', male: true }) : this.setState({ colorMale: 'black', male: false });
            
        } else {
            this.state.colorFemale === 'black' ? this.setState({ colorFemale: 'salmon', female: true }) : this.setState({ colorFemale: 'black', female: false });
        }
    }

    onSelectedItemsChange = (selectedBreeds) => {
        if ( selectedBreeds.length > maxBreeds ) {
          return;
        }
        this.setState({confirmText:`${selectedBreeds.length}/${maxBreeds}`})
        this.setState({ selectedBreeds })
      }

    saveUserFilters = async () => {
        const { navigation } = this.props

        let id = navigation.getParam('user').id
        let token = await AsyncStorage.getItem('userToken')
        
        let gender = []

        if (this.state.male) {
            gender.push('male')
        } 
        if (this.state.female) {
            gender.push('female')
        }

        try {
            await updateUser( this.state.value, gender, id, token)
            await updateUserBreeds( this.selectedBreeds, id )
            navigation.goBack()
        } catch (error) {
            console.log(error)
        }
    }

    render() {
        return (
            <View style={{ flex: 1, flexDirection: 'column', justifyContent: 'space-between'}}>
                <MultiSelect selectedBreeds={this.state.selectedBreeds} onSelectedItemsChange={this.onSelectedItemsChange} confirmText={this.state.confirmText}/>
    
                <View >
                    <Text style={[styles.text]}>Show dogs in the radius of: </Text>
                    {/* <Slider
                        style={{width: 200, height: 40}}
                        minimumValue={10}
                        maximumValue={250}
                        minimumTrackTintColor="#FFFFFF"
                        maximumTrackTintColor="#000000"
                    /> */}
                    <View style={styles.container}>
                        <Slider
                            value={this.state.value}
                            minimumValue={10}
                               maximumValue={200}
                
                               step={1}
                            //    trackStyle={iosStyles.track}
                            //    thumbStyle={iosStyles.thumb}
                               minimumTrackTintColor='#1073ff'
                               maximumTrackTintColor='#b7b7b7'
              
                            onValueChange={value => this.setState({ value })}
                        />
                        
                    </View><Text style={styles.text}>
                            {this.state.value} Miles
                        </Text>
                </View>
                {/* <View>
                    <Text style={[styles.text]}>Show dogs from the ages: </Text>
                </View> */}
                <View>
                    <Text style={[styles.text]}>Gender: </Text>
                    <Button  value='yo' title='Male' onPress={() => {this.onPressColorChange('male')}} color={`${this.state.colorMale}`}></Button>
                    <Button title='Female' onPress={() => {this.onPressColorChange('female')}} color={`${this.state.colorFemale}`}></Button>
                    
                </View>
                <View>
                    <TouchableOpacity style={styles.button} onPress={this.saveUserFilters}>
                        <Text>Save Filters</Text>
                    </TouchableOpacity>
                </View>
            </View>
        );
    }
}


const styles = StyleSheet.create({
    text: {
        textAlign: 'center'
    },
    container: {
        flex: 1,
        marginLeft: 50,
        marginRight: 50,
        alignItems: "stretch",
        justifyContent: "center",
      },
      button: {
        alignSelf: 'stretch',
        alignItems: 'center',
        justifyContent: 'center',
        borderWidth: 2,
        borderRadius: 15,
        paddingVertical: 10,
        marginHorizontal: 50
    }
})

var iosStyles = StyleSheet.create({
    track: {
      height: 2,
      borderRadius: 1,
    },
    thumb: {
      width: 20,
      height: 20,
      borderRadius: 30 / 2,
      backgroundColor: 'white',
      shadowColor: 'black',
      shadowOffset: {width: 0, height: 2},
      shadowRadius: 2,
      shadowOpacity: 0.35,
    }
  });